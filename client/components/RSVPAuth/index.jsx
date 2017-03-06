import React from 'react'
import DocumentTitle from 'react-document-title'

import styles from './styles.css'

export default class RSVPAuth extends React.Component {
	static propTypes = {
		codeWord: React.PropTypes.string,
		dispatch: React.PropTypes.func.isRequired,
	}

	process = (e) => {
		e.preventDefault()
		const codeWord = e.target.elements.codeWord.value.toLowerCase().replace(/\W/g, '')
		this.props.dispatch(codeWord)
	}

	render() {
		return (
			<DocumentTitle title='About the Wedding'>
				<form className='content' onSubmit={this.process}>
					<h1 className='title'>Enter Your Code Word</h1>
					<div className={styles.inputContainer}>
						<input type='text' autoComplete='off' name='codeWord' />
						<button>Next</button>
					</div>
				</form>
			</DocumentTitle>
		)
	}
}
