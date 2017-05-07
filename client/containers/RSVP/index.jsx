import React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import { fetchPartyByCodeWordIfNeeded, updatePeople } from '../../actions'

import RSVPAuth from '../../components/RSVPAuth'
import RSVPParty from '../RSVPParty'

class RSVP extends React.Component {
	static propTypes = {
		codeWord: React.PropTypes.string,
		party: React.PropTypes.object,
		people: React.PropTypes.object,
		location: React.PropTypes.object,
		dispatch: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object,
	}

	fetchPartyByCodeWord = (word) => {
		const { dispatch } = this.props
		dispatch(fetchPartyByCodeWordIfNeeded(word))
	}

	savePeople = (people) => {
		const { dispatch, codeWord } = this.props
		dispatch(updatePeople(people, codeWord))
	}

	parsePeopleFromForm = (formInfo) => {
		let people = {}
		const activityFields = ['fishing', 'hanford', 'biking', 'kayaking', 'ligo', 'pike-place', 'powells']
		for (const key in formInfo) {
			const id = key.substr(0,36)
			if (!this.props.people[id]) {
				continue
			}
			people[id] = this.props.people[id]
			let field = key.substr(37)
			let val = formInfo[key]
			if (field === 'email') {
				people[id][field] = val
			}
			if (field === 'attending') {
				people[id]['replied'] = true
				people[id]['reply'] = val === 'yes'
				continue
			}
			if (field === 'diet') {
				people[id]['dietaryRestrictions'] = val
				continue
			}
			if (field === 'song') {
				people[id]['songRequest'] = val
				continue
			}
			if (field === 'hiking') {
				people[id]['hiking'] = val
				continue
			}
			if (field === 'kayaking') {
				people[id]['kayaking'] = val
				continue
			}
			if (field === 'jetski') {
				people[id]['jetski'] = val
				continue
			}
			if (field === 'fishing') {
				people[id]['fishing'] = val
				continue
			}
			if (field === 'hanford') {
				people[id]['hanford'] = val
				continue
			}
			if (field === 'ligo') {
				people[id]['ligo'] = val
				continue
			}
			if (field === 'reach') {
				people[id]['reach'] = val
				continue
			}
			if (field === 'bechtel') {
				people[id]['bechtel'] = val
				continue
			}
			if (field === 'wine') {
				people[id]['wine'] = val
				continue
			}
			if (field === 'escape-room') {
				people[id]['escapeRoom'] = val
				continue
			}
		}
		return Object.values(people)
	}

	componentDidMount() {
		if (this.props.codeWord !== null && this.props.codeWord.length > 0 && this.props.party.ID !== undefined) {
			this.fetchPartyByCodeWord(this.props.codeWord)
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.codeWord === this.props.codeWord && this.props.party.ID !== undefined) {
			return
		}
		if (this.props.codeWord !== null && this.props.codeWord.length > 0 && this.props.party.ID === undefined) {
			this.fetchPartyByCodeWord(this.props.codeWord)
		}
	}

	render() {
		if (this.props.codeWord === null || this.props.codeWord.length < 1) {
			return (
				<RSVPAuth codeWord={this.props.codeWord} dispatch={this.fetchPartyByCodeWord} errors={this.props.errors} />
			)
		} else {
			return (
				<RSVPParty party={this.props.party} codeWord={this.props.codeWord} onSubmit={(formInfo) => this.savePeople(this.parsePeopleFromForm(formInfo))} errors={this.props.errors} />
			)
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	let codeWord = state.rsvp.codeWord
	if (ownProps && ownProps.location && ownProps.location.query) {
		const qcw = ownProps.location.query.codeWord
		if (qcw && qcw.length > 0) {
			codeWord = qcw
		}
	}
	let partyID = ''
	if (codeWord && state.rsvp.codeWords[codeWord]) {
		partyID = state.rsvp.codeWords[codeWord].partyID
	}
	let party = {}
	if (state.rsvp.parties[partyID] !== undefined) {
		party = state.rsvp.parties[partyID]
	}

  return {
		codeWord,
		party,
		people: state.rsvp.people,
		errors: state.rsvp.errors,
  }
}

export default connect(mapStateToProps)(RSVP)
