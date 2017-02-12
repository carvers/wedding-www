import React from 'react'
import styles from './styles.css'

export default class RSVPAdminFilterBar extends React.Component {
	render() {
		let plural = ''
		if (this.props.count != 1) {
			plural = 's'
		}
		return (
			<div className={styles.bar}>
				<div>{this.props.count} result{plural}</div>
				<div>
					<a onClick={this.props.onClearFilters} title='Clear filters' href='#'>Clear filters</a>
					<select onChange={this.props.onDietChange} value={this.props.dietValue}>
						<option value=''>Dietary Needs</option>
						<option value='yes'>Has Needs</option>
						<option value='no'>Has No Needs</option>
						<option value='self-sufficient'>Will Feed Themselves</option>
					</select>
					<select onChange={this.props.onStatusChange} value={this.props.statusValue}>
						<option value=''>Status</option>
						<option value='yes'>Coming</option>
						<option value='no'>Not Coming</option>
						<option value='?'>Not Responded</option>
					</select>
					<input type="text" placeholder="Name" onChange={this.props.onNameChange} value={this.props.nameValue} />
				</div>
			</div>
		)
	}
}
