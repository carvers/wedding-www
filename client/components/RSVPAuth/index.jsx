import React from 'react'
import DocumentTitle from 'react-document-title'

import Error from '../Error'
import errorConsts from '../../errors'

import styles from './styles.css'

export default class RSVPAuth extends React.Component {
	static propTypes = {
		codeWord: React.PropTypes.string,
		errors: React.PropTypes.object,
		dispatch: React.PropTypes.func.isRequired,
	}

	errorIsNotFound = (errors) => {
		console.log(errors)
		if (!errors) {
			return false 
		}
		if (!errors.codeWord) {
			return false
		}
		console.log(errors.NOT_FOUND)
		return errors.codeWord === errorConsts.NOT_FOUND
	}

	process = (e) => {
		e.preventDefault()
		const codeWord = e.target.elements.codeWord.value.toLowerCase().replace(/\W/g, '')
		this.props.dispatch(codeWord)
	}

	render() {
		return (
			<DocumentTitle title='RSVP'>
				<form className='content' onSubmit={this.process}>
					<h1 className='title'>Enter Your Code Word</h1>
					<div className={styles.inputContainer}>
						<input type='text' autoComplete='off' name='codeWord' />
						<Error error={this.errorIsNotFound(this.props.errors)} className={styles.error} message='That looks like the wrong code word. Try again?' />
						<button>Next</button>
					</div>
				</form>
			</DocumentTitle>
		)
	}
}
