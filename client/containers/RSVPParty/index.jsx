import React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import {fetchPeopleByPartyIfNeeded} from '../../actions'

class RSVPParty extends React.Component {
	static propTypes = {
		codeWord: React.PropTypes.string.isRequired,
		partyID: React.PropTypes.string.isRequired,
		people: React.PropTypes.object,
		dispatch: React.PropTypes.func.isRequired,
	}

	componentDidMount() {
		const { dispatch, partyID, codeWord} = this.props
		dispatch(fetchPeopleByPartyIfNeeded(partyID, codeWord))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.party.ID !== this.props.party.ID) {
			const { dispatch, partyID, codeWord } = nextProps
			dispatch(fetchPeopleByPartyIfNeeded(partyID, codeWord))
		}
	}

	renderPeople(people) {
		let output = []
		for (const p in people) {
			const person = people[p]
			output.push(<li key={p}>{person.name}</li>)
		}
		return output
	}

	process = (e) => {
		e.preventDefault()
	}

	render() {
		return (
			<DocumentTitle title={'RSVP for '+this.props.party.name}>
				<form onSubmit={this.process}>
					<h2 className='title'>RSVP for {this.props.party.name}</h2>
					<ul>{this.renderPeople(this.props.people)}</ul>
				</form>
			</DocumentTitle>
		)
	}
}

const mapStateToProps = state => {
	const codeWord = state.codeWord
	let partyID = ''
	let people = {}
	if (codeWord && state.codeWords[codeWord]) {
		partyID = state.codeWords[codeWord].partyID
		for (const p in state.people) {
			console.log(state.people[p].party, partyID)
			if (state.people[p].party == partyID) {
				people[state.people[p].ID] = state.people[p]
			}
		}
	}

	return {
		codeWord,
		partyID,
		people,
	}
}

export default connect(mapStateToProps)(RSVPParty)
