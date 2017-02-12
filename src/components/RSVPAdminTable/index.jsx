import React from 'react'
import {Link} from 'react-router'
import styles from './styles.css'

export default class RSVPAdminTable extends React.Component {
	render() {
		const parties = this.props.parties
		let people = this.props.people.map((person) => {
			let status = '\u2754';
			let statusStyle = '';
			if (person.replied && person.reply) {
				status = '\u2713';
				statusStyle = styles.green;
			} else if (person.replied && !person.reply) {
				status = '\u274C';
				statusStyle = styles.red;
			}
			let restrictions = '\u274C';
			if (person.dietaryRestrictions && person.dietaryRestrictions != '') {
				restrictions = person.dietaryRestrictions
			}
			if (restrictions == 'self-sufficient') {
				restrictions = '\uD83C\uDF92'
			}
			let partyName = ''
			let codeWord = ''
			if (person.party && parties[person.party]) {
				partyName = parties[person.party].name
				codeWord = parties[person.party].codeWord
			} else {
				console.log(person.party, 'not found')
			}
			return <tr key={person.ID}>
				<td><Link to={'/rsvp/admin/person/'+person.ID} title={person.name}>{person.name}</Link></td>
				<td><Link to={'/rsvp/admin/party/'+person.party} title={partyName}>{partyName}</Link></td>
				<td className={styles.centered + ' ' + statusStyle}>{status}</td>
				<td className={styles.centered}>{restrictions}</td>
				<td className={styles.centered}><a href={'/rsvp/party.html?codeWord='+codeWord} title={'Edit '+person.name+'’s Response'}>Edit</a></td>
			</tr>
		})
		let nameSort = ''
		let partySort = ''
		if (this.props.sortField == 'name' && this.props.sortDir == 1) {
			nameSort = ' \u2B07'
		} else if (this.props.sortField == 'name' && this.props.sortDir == -1) {
			nameSort = ' \u2B06'
		} else if (this.props.sortField == 'party' && this.props.sortDir == 1) {
			partySort = ' \u2B07'
		} else if (this.props.sortField == 'party' && this.props.sortDir == -1) {
			partySort = ' \u2B06'
		}
		return (
			<table className={styles.fullWidth}>
				<tbody>
					<tr className={styles.header}>
						<th className={styles.sortable} onClick={this.props.sortHandler} data-sort-field="name">Name{nameSort}</th>
						<th className={styles.sortable} onClick={this.props.sortHandler} data-sort-field="party">Party{partySort}</th>
						<th>Coming</th>
						<th>Dietary Needs</th>
						<th>Response</th>
					</tr>
					{people}
				</tbody>
			</table>
		)
	}
}
