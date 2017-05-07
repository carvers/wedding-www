import React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'

import styles from './styles.css'

import {fetchPeopleByPartyIfNeeded, setPlusOne} from '../../actions'

import PlusOneInput from '../../components/RSVPPartyPlusOne'

class PersonDetails extends React.Component {
	static propTypes = {
		person: React.PropTypes.object.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	}

	render() {
		const {person, dispatch} = this.props
		if (person.attendingChecked == 'no' || (person.replied && !person.reply)) {
			return null
		}
		return (
			<section>
				<section className={styles.diet}>
					<label htmlFor={person.ID+'-diet'}>Has the following dietary restrictions:</label>
					<Field name={person.ID+'-diet'} id={person.ID+'-diet'} component='textarea' type='text' />
				</section>
				<PlusOneInput guestOf={person} onChange={event => dispatch(setPlusOne(person.ID, event.target.value))} />
				<section>
					<label htmlFor={person.ID+'-song'}>Promises to dance if you play:</label>
					<Field name={person.ID+'-song'} id={person.ID+'-song'} component='input' type='text' />
				</section>
				<section>
					<label htmlFor={person.ID+'-email'}>Can be emailed at (optional):</label>
					<Field name={person.ID+'-email'} id={person.ID+'-email'} component='input' type='email' />
				</section>
				<section className={styles.activities}>
					<p>Would like to, while they&rsquo;re in the Tri-Cities&hellip;</p>
					<ul>
						<li>
							<Field name={person.ID+'-hiking'} id={person.ID+'-hiking'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-hiking'}>Hike in the mountains</label>
						</li>
						<li>
							<Field name={person.ID+'-kayaking'} id={person.ID+'-kayaking'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-kayaking'}>Kayak in the Columbia River</label>
						</li>
						<li>
							<Field name={person.ID+'-jetski'} id={person.ID+'-jetski'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-jetski'}>Jet Ski in the Columbia Rivier</label>
						</li>
						<li>
							<Field name={person.ID+'-fishing'} id={person.ID+'-fishing'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-fishing'}>Fish in the Columbia River</label>
						</li>
						<li>
							<Field name={person.ID+'-hanford'} id={person.ID+'-hanford'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-hanford'}>Tour the Hanford B-Reactor</label>
						</li>
						<li>
							<Field name={person.ID+'-ligo'} id={person.ID+'-ligo'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-ligo'}>Tour the LIGO Research Facility</label>
						</li>
						<li>
							<Field name={person.ID+'-reach'} id={person.ID+'-reach'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-reach'}>Visit the REACH Museum</label>
						</li>
						<li>
							<Field name={person.ID+'-bechtel'} id={person.ID+'-bechtel'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-bechtel'}>Visit the Bechtel Planetarium</label>
						</li>
						<li>
							<Field name={person.ID+'-wine'} id={person.ID+'-wine'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-wine'}>Take a wine tour of the region</label>
						</li>
						<li>
							<Field name={person.ID+'-escape-room'} id={person.ID+'-escape-room'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-escape-room'}>Try to escape from our puzzle room</label>
						</li>
					</ul>
				</section>
			</section>
		)
	}
}

class RSVPParty extends React.Component {
	static propTypes = {
		codeWord: React.PropTypes.string.isRequired,
		partyID: React.PropTypes.string.isRequired,
		people: React.PropTypes.object,
		handleSubmit: React.PropTypes.func.isRequired,
	}

	componentDidMount() {
		window.scrollTo(0, 0)
		const { dispatch, partyID, codeWord } = this.props
		if (partyID && codeWord) {
			dispatch(fetchPeopleByPartyIfNeeded(partyID, codeWord))
		}
	}

	componentDidUpdate(prevProps) {
		const { dispatch, partyID, codeWord, people} = this.props
		if (partyID && codeWord && (partyID !== prevProps.partyID || codeWord !== prevProps.codeWord)) {
			dispatch(fetchPeopleByPartyIfNeeded(partyID, codeWord))
		}
	}

	renderPeople(people) {
		const { dispatch } = this.props
		let output = []
		for (const p in people) {
			const person = people[p]
			output.push(<li key={p} className={styles.person}>
				<h3 className='subsection'>{person.name}</h3>
				<section className={styles.attending}>
					<Field name={person.ID+'-attending'} id={person.ID+'-attending'} component='input' type='radio' value='yes' />
					<label htmlFor={person.ID+'-attending'}>Will celebrate in person</label>
					<Field name={person.ID+'-attending'} id={person.ID+'-not-attending'} component='input' type='radio' value='no' />
					<label htmlFor={person.ID+'-not-attending'}>Will celebrate in spirit</label>
				</section>
				<PersonDetails person={person} dispatch={dispatch} />
			</li>)
		}
		return output
	}

	render() {
		const {handleSubmit, party, people} = this.props
		return (
			<DocumentTitle title={'RSVP for '+party.name}>
				<form onSubmit={handleSubmit} className='content' id='rsvp-form'> 
					<h2 className='title'>RSVP for {party.name}</h2>
					<ul className={styles.people}>{this.renderPeople(people)}</ul>
					<input type='submit' className={styles.save} value='Save' />
				</form>
			</DocumentTitle>
		)
	}
}

const mapStateToProps = state => {
	const codeWord = state.rsvp.codeWord
	let partyID = ''
	let people = {}
	let initialValues = {}
	if (codeWord && state.rsvp.codeWords[codeWord]) {
		partyID = state.rsvp.codeWords[codeWord].partyID
		for (const p in state.rsvp.people) {
			if (state.rsvp.people[p].party == partyID) {
				let person = state.rsvp.people[p]
				person.attendingChecked = selector(state, person.ID+'-attending')
				people[person.ID] = person
				if (person.replied) {
					initialValues[person.ID+'-attending'] = person.reply ? 'yes' : 'no'
				}
				initialValues[person.ID+'-diet'] = person.dietaryRestrictions
				initialValues[person.ID+'-song'] = person.songRequest
				initialValues[person.ID+'-hiking'] = person.hiking
				initialValues[person.ID+'-email'] = person.email
				initialValues[person.ID+'-kayaking'] = person.kayaking
				initialValues[person.ID+'-jetski'] = person.jetski
				initialValues[person.ID+'-fishing'] = person.fishing
				initialValues[person.ID+'-hanford'] = person.hanford
				initialValues[person.ID+'-ligo'] = person.ligo
				initialValues[person.ID+'-reach'] = person.reach
				initialValues[person.ID+'-bechtel'] = person.bechtel
				initialValues[person.ID+'-wine'] = person.wine
				initialValues[person.ID+'-escape-room'] = person.escapeRoom
			}
		}
	}

	return {
		codeWord,
		partyID,
		people,
		initialValues: initialValues,
		enableReinitialize: true,
		keepDirtyOnReinitialize: true,
	}
}

RSVPParty = reduxForm({form: 'rsvp-party', pure: false})(RSVPParty)
const selector = formValueSelector('rsvp-party')
export default connect(mapStateToProps)(RSVPParty)
