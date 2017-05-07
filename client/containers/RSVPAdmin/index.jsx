import React from 'react'
import {Link} from 'react-router'
import update from 'immutability-helper'
import { connect } from 'react-redux'

import RSVPAdminActivities from '../../components/RSVPAdminActivities'
import RSVPAdminAuth from '../../components/RSVPAdminAuth'
import RSVPAdminFilterBar from '../../components/RSVPAdminFilterBar'
import RSVPAdminStats from '../../components/RSVPAdminStats'
import RSVPAdminTable from '../../components/RSVPAdminTable'


import { fetchPartiesIfNeeded, fetchPeopleIfNeeded, setFilterName, setFilterDiet, setFilterStatus, clearFilters, setSortField, changeSortDir, setAdminToken } from '../../actions'

class RSVPAdmin extends React.Component {
	static propTypes = {
		nameFilter: React.PropTypes.string,
		dietFilter: React.PropTypes.string,
		statusFilter: React.PropTypes.string,
		sortField: React.PropTypes.string,
		sortDir: React.PropTypes.number,
		people: React.PropTypes.object,
		parties: React.PropTypes.object,
		token: React.PropTypes.string,
		dispatch: React.PropTypes.func.isRequired,
	}

	componentDidMount() {
		if (this.props.token !== null && this.props.token.length > 0) {
			this.loadParties(this.props.token)
			this.loadPeople(this.props.token)
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.token === this.props.token) {
			return
		}
		if (this.props.token !== null && this.props.token.length > 0) {
			this.loadParties(this.props.token)
			this.loadPeople(this.props.token)
		}
	}

	loadPeople(token) {
		const { dispatch } = this.props
		dispatch(fetchPeopleIfNeeded([], token))
	}

	loadParties(token) {
		const { dispatch } = this.props
		dispatch(fetchPartiesIfNeeded([], token))
	}

	changeName = (event) => {
		const { dispatch } = this.props
		dispatch(setFilterName(event.target.value))
	}

	changeDiet = (event) => {
		const { dispatch } = this.props
		dispatch(setFilterDiet(event.target.value))
	}

	changeStatus = (event) => {
		const { dispatch } = this.props
		dispatch(setFilterStatus(event.target.value))
	}

	clearFilters = (event) => {
		event.preventDefault()
		const { dispatch } = this.props
		dispatch(clearFilters())
	}

	changeSort = (event) => {
		const { dispatch } = this.props
		dispatch(setSortField(event.target.dataset.sortField))
		dispatch(changeSortDir())
	}

	login = (token) => {
		const { dispatch } = this.props
		dispatch(setAdminToken(token))
	}

	sort(people, parties, field, direction) {
		return Object.keys(people).sort((a, b) => {
			const personA = people[a]
			const personB = people[b]
			if (field == 'party') {
				const partyA = parties[personA.party]
				const partyB = parties[personB.party]
				if (personA.party == personB.party) {
					if (personA.name < personB.name) {
						return -1 * direction
					} else if (personA.name > personB.name) {
						return 1 * direction
					} else if (a < b) {
						return -1 * direction
					}
					return 1 * direction
				}
				if (!partyA && !partyB) {
					if (personA.party < personB.party) {
						return -1 * direction
					}
					return 1 * direction
				}
				if (!partyA) {
					return 1 * direction
				}
				if (!partyB) {
					return -1 * direction
				}
				if (partyA.sortValue < partyB.sortValue) {
					return -1 * direction
				} else if (partyA.sortValue > partyB.sortValue) {
					return 1 * direction
				}
			} else if (field == 'name') {
				if(personA.name < personB.name) {
					return -1 * direction
				} else if(personA.name > personB.name) {
					return 1 * direction
				} else if(a < b) {
					return -1 * direction
				} else {
					return 1 * direction
				}
			}
		}).map((id) => {
			return people[id]
		})
	}

	filter(people, filterName, filterDiet, filterStatus) {
		filterName = filterName.toLowerCase()
		return Object.keys(people).filter((id) => {
			let person = people[id]
			if (person.name.toLowerCase().indexOf(filterName) < 0) {
				return false
			}
			if (person.replied && filterStatus == '?') {
				return false
			}
			if (person.replied && person.reply && filterStatus == 'no') {
				return false
			}
			if (person.replied && !person.reply && filterStatus == 'yes') {
				return false
			}
			if (!person.replied && (filterStatus == 'yes' || filterStatus == 'no')) {
				return false
			}
			if (filterDiet == 'no' && person.dietaryRestrictions && person.dietaryRestrictions != '') {
				return false
			}
			if (filterDiet == 'yes' && (!person.dietaryRestrictions || person.dietaryRestrictions == '' || person.dietaryRestrictions == 'self-sufficient')) {
				return false
			}
			if (filterDiet == 'self-sufficient' && filterDiet != person.dietaryRestrictions) {
				return false
			}
			return true
		}).map((id) => {
			return people[id]
		})
	}

	activityCount(people, activity) {
		let count = 0
		Object.values(people).forEach(person => {
			if (!person.replied || !person.reply) {
				return
			}
			switch (activity) {
							case 'hiking':
											if (person.hiking) {
												count++
											}
											break
							case 'kayaking':
											if (person.kayaking) {
												count++
											}
											break
							case 'jetski':
											if (person.jetski) {
												count++
											}
											break
							case 'fishing':
											if (person.fishing) {
												count++
											}
											break
							case 'hanford':
											if (person.hanford) {
												count++
											}
											break
							case 'ligo':
											if (person.ligo) {
												count++
											}
											break
							case 'reach':
											if (person.reach) {
												count++
											}
											break
							case 'bechtel':
											if (person.bechtel) {
												count++
											}
											break
							case 'wine':
											if (person.wine) {
												count++
											}
											break
							case 'escapeRoom':
											if (person.escapeRoom) {
												count++
											}
											break
			}
		})
		return count
	}

	render() {
		if (this.props.token === null || this.props.token.length < 1) {
			return (
				<RSVPAdminAuth dispatch={this.login} />
			)
		}
		const filteredPeople = this.sort(this.filter(this.props.people, this.props.nameFilter, this.props.dietFilter, this.props.statusFilter), this.props.parties, this.props.sortField, this.props.sortDir)
		return (
			<div>
				<RSVPAdminStats coming={this.filter(this.props.people, '', '', 'yes').length} notComing={this.filter(this.props.people, '', '', 'no').length} noResponse={this.filter(this.props.people, '', '', '?').length} />
				<RSVPAdminActivities
					hiking={this.activityCount(this.props.people, 'hiking')}
					kayaking={this.activityCount(this.props.people, 'kayaking')}
					jetski={this.activityCount(this.props.people, 'kayaking')}
					fishing={this.activityCount(this.props.people, 'fishing')}
					hanford={this.activityCount(this.props.people, 'hanford')}
					ligo={this.activityCount(this.props.people, 'ligo')}
					reach={this.activityCount(this.props.people, 'reach')}
					bechtel={this.activityCount(this.props.people, 'bechtel')}
					wine={this.activityCount(this.props.people, 'wine')}
					escapeRoom={this.activityCount(this.props.people, 'escapeRoom')}
				/>
				<RSVPAdminFilterBar count={filteredPeople.length} onDietChange={this.changeDiet} onStatusChange={this.changeStatus} onNameChange={this.changeName} onClearFilters={this.clearFilters} dietValue={this.props.dietFilter} nameValue={this.props.nameFilter} statusValue={this.props.statusFilter} />
				<RSVPAdminTable people={filteredPeople} parties={this.props.parties} sortField={this.props.sortField} sortDir={this.props.sortDir} sortHandler={this.changeSort} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	let sortField = 'party'
	let sortDir = 1
	if (state.rsvp.sort.field) {
		sortField = state.rsvp.sort.field
	}
	if (state.rsvp.sort.dir == 1 || state.rsvp.sort.dir == -1) {
		sortDir = state.rsvp.sort.dir
	}
	return {
		nameFilter: state.rsvp.filters.name,
		dietFilter: state.rsvp.filters.diet,
		statusFilter: state.rsvp.filters.status,
		sortField: sortField,
		sortDir: sortDir,
		people: state.rsvp.people,
		parties: state.rsvp.parties,
		token: state.rsvp.token,
	}
}

export default connect(mapStateToProps)(RSVPAdmin)
