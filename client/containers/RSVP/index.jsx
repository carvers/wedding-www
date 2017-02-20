import React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import { fetchPartyByCodeWordIfNeeded } from '../../actions'

import RSVPAuth from '../../components/RSVPAuth'

class RSVP extends React.Component {
	static propTypes = {
		codeWord: React.PropTypes.string,
		partyID: React.PropTypes.string,
		dispatch: React.PropTypes.func.isRequired,
	}

	fetchPartyByCodeWord(word) {
		const { dispatch } = this.props
		dispatch(fetchPartyByCodeWordIfNeeded(codeWord))
	}

	render() {
		if (this.props.codeWord === null || this.props.codeWord.length < 1 || this.props.partyID === null || this.props.partyID.length < 1) {
			return (
				<RSVPAuth codeWord={this.props.codeWord} onSubmit={this.fetchPartyByCodeWord(word)} />
			)
		} else {
			return (
				<RSVPParty party={this.props.partyID} />
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
		partyID,
  }
}

export default connect(mapStateToProps)(RSVP)
