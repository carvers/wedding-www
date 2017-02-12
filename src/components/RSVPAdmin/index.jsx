import React from 'react'
import {Link} from 'react-router'
import update from 'immutability-helper'

import RSVPAdminFilterBar from '../RSVPAdminFilterBar'
import RSVPAdminSpinner from '../RSVPAdminSpinner'
import RSVPAdminStats from '../RSVPAdminStats'
import RSVPAdminTable from '../RSVPAdminTable'

export default class RSVPAdmin extends React.Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			loading: {},
			nameFilter: '',
			dietFilter: '',
			statusFilter: '',
			sortField: 'party',
			sortDir: 1,
			people: {},
			parties: {},
		}
	}

	componentDidMount() {
		this.loadParties()
		this.loadPeople()
	}

	loadPeople() {
		this.setState({'loading': update(this.state.loading, {$merge: {people: true}})})
		fetch('http://api.wedding.carvers.house/people')
			.then((response) => {
				return response.json()
			})
			.then((resp) => {
				let people = {};
				resp.people.forEach((person) => {
					people[person.ID] = person
				})
				this.setState({'people': people, 'loading': update(this.state.loading, {$merge: {people: false}})})
			})
	}

	loadParties() {
		this.setState({'loading': update(this.state.loading, {$merge: {parties: true}})})
		fetch('http://api.wedding.carvers.house/parties')
			.then((response) => {
				return response.json()
			})
			.then((resp) => {
				let parties = {};
				resp.parties.forEach((party) => {
					parties[party.ID] = party
				})
				this.setState({'parties': parties, 'loading': update(this.state.loading, {$merge: {parties: false}})})
			})
	}

	changeName = (event) => {
		this.setState({'nameFilter': event.target.value})
	}

	changeDiet = (event) => {
		this.setState({'dietFilter': event.target.value})
	}

	changeStatus = (event) => {
		this.setState({'statusFilter': event.target.value})
	}

	clearFilters = (event) => {
		event.preventDefault()
		this.setState({'nameFilter': '', 'dietFilter': '', 'statusFilter': ''})
	}

	changeSort = (event) => {
		let dir = 1
		if (this.state.sortField == event.target.dataset.sortField) {
			dir = this.state.sortDir * -1
		}
		this.setState({'sortDir': dir, 'sortField': event.target.dataset.sortField})
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

	render() {
		const filteredPeople = this.sort(this.filter(this.state.people, this.state.nameFilter, this.state.dietFilter, this.state.statusFilter), this.state.parties, this.state.sortField, this.state.sortDir)
		return (
			<div>
				<RSVPAdminSpinner active={this.state.loading} />
				<RSVPAdminStats coming={this.filter(this.state.people, '', '', 'yes').length} notComing={this.filter(this.state.people, '', '', 'no').length} noResponse={this.filter(this.state.people, '', '', '?').length} />
				<RSVPAdminFilterBar count={filteredPeople.length} onDietChange={this.changeDiet} onStatusChange={this.changeStatus} onNameChange={this.changeName} onClearFilters={this.clearFilters} dietValue={this.state.dietFilter} nameValue={this.state.nameFilter} statusValue={this.state.statusFilter} />
				<RSVPAdminTable people={filteredPeople} parties={this.state.parties} sortField={this.state.sortField} sortDir={this.state.sortDir} sortHandler={this.changeSort} />
			</div>
		);
	}
}
