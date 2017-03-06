import React from 'react'
import DocumentTitle from 'react-document-title'

export default class RSVPAuth extends React.Component {
	static propTypes = {
		codeWord: React.PropTypes.string,
		dispatch: React.PropTypes.func.isRequired,
	}

	process = (e) => {
		e.preventDefault()
		this.props.dispatch(e.target.elements.codeWord.value)
	}

	render() {
		return (
			<DocumentTitle title='About the Wedding'>
				<form className='content' onSubmit={this.process}>
					<h1 className='title'>Enter Your Code Word</h1>
					<div className='input-container'>
						<input type='text' name='codeWord' />
						<button>Next</button>
					</div>
				</form>
			</DocumentTitle>
		)
	}
}
