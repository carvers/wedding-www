import React from 'react'
import DocumentTitle from 'react-document-title'

export default class Error extends React.Component {
	static propTypes = {
		error: React.PropTypes.bool.isRequired,
	}

	render() {
		if (!this.props.error) {
			return null
		}
		return this.props.children
	}
}
