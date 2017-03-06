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
		console.log(person)
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
							<Field name={person.ID+'-pike-place'} id={person.ID+'-pike-place'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-pike-place'}>Visit the Pike Place Market in Seattle</label>
						</li>
						<li>
							<Field name={person.ID+'-fishing'} id={person.ID+'-fishing'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-fishing'}>Fish in the Columbia River</label>
						</li>
						<li>
							<Field name={person.ID+'-hanford'} id={person.ID+'-hanford'} component='input' type='checkbox' />
							<label htmlFor={person.ID+'-hanford'}>Tour the Hanford B-Reactor</label>
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
		const { dispatch, partyID, codeWord} = this.props
		dispatch(fetchPeopleByPartyIfNeeded(partyID, codeWord))
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
	if (codeWord && state.rsvp.codeWords[codeWord]) {
		partyID = state.rsvp.codeWords[codeWord].partyID
		for (const p in state.rsvp.people) {
			if (state.rsvp.people[p].party == partyID) {
				let person = state.rsvp.people[p]
				person.attendingChecked = selector(state, person.ID+'-attending')
				people[person.ID] = person
			}
		}
	}

	return {
		codeWord,
		partyID,
		people,
	}
}

RSVPParty = reduxForm({form: 'rsvp-party', pure: false})(RSVPParty)
const selector = formValueSelector('rsvp-party')
export default connect(mapStateToProps)(RSVPParty)
