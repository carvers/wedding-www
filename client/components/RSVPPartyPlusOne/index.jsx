import React from 'react'
import {Field} from 'redux-form'

export default class PlusOneInput extends React.Component {
	static propTypes = {
		guestOf: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
	}

	render() {
		const {guestOf, onChange} = this.props
		if (!guestOf.getsPlusOne) {
			return null
		}
		return (
			<section>
				<label htmlFor={guestOf.ID+'-plusone'}>Will be bringing a friend named:</label>
				<Field name={guestOf.ID+'-plusone'} id={guestOf.ID+'-plusone'} component='input' type='text' onChange={onChange} />
			</section>
		)
	}
}
