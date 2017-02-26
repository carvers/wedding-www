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
	}

	fetchPartyByCodeWord = (word) => {
		const { dispatch } = this.props
		dispatch(fetchPartyByCodeWordIfNeeded(word))
	}

	render() {
		if (this.props.codeWord === null || this.props.codeWord.length < 1) {
			return (
				<RSVPAuth codeWord={this.props.codeWord} dispatch={this.fetchPartyByCodeWord} />
			)
		} else {
			return (
				<RSVPParty party={this.props.party} codeWord={this.props.codeWord} save={() => {}} />
			)
		}
	}
}

const mapStateToProps = state => {
	const codeWord = state.codeWord
	let partyID = ''
	if (codeWord && state.codeWords[codeWord]) {
		partyID = state.codeWords[codeWord].partyID
	}

  return {
		codeWord,
		party: state.parties[partyID],
  }
}

export default connect(mapStateToProps)(RSVP)
