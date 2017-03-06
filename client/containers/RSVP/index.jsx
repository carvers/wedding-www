import React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import { fetchPartyByCodeWordIfNeeded } from '../../actions'

import RSVPAuth from '../../components/RSVPAuth'
import RSVPParty from '../RSVPParty'

class RSVP extends React.Component {
	static propTypes = {
		codeWord: React.PropTypes.string,
		party: React.PropTypes.object,
		dispatch: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object,
	}

	fetchPartyByCodeWord = (word) => {
		const { dispatch } = this.props
		dispatch(fetchPartyByCodeWordIfNeeded(word))
	}

	render() {
		if (this.props.codeWord === null || this.props.codeWord.length < 1) {
			return (
				<RSVPAuth codeWord={this.props.codeWord} dispatch={this.fetchPartyByCodeWord} errors={this.props.errors} />
			)
		} else {
			return (
				<RSVPParty party={this.props.party} codeWord={this.props.codeWord} onSubmit={data => console.log(data)} errors={this.props.errors} />
			)
		}
	}
}

const mapStateToProps = state => {
	const codeWord = state.rsvp.codeWord
	let partyID = ''
	if (codeWord && state.rsvp.codeWords[codeWord]) {
		partyID = state.rsvp.codeWords[codeWord].partyID
	}

  return {
		codeWord,
		party: state.rsvp.parties[partyID],
		errors: state.rsvp.errors,
  }
}

export default connect(mapStateToProps)(RSVP)
