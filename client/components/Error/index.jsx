import React from 'react'
import DocumentTitle from 'react-document-title'

export default class Error extends React.Component {
	static propTypes = {
		error: React.PropTypes.bool.isRequired,
		message: React.PropTypes.string.isRequired,
		className: React.PropTypes.string,
	}

	render() {
		if (!this.props.error) {
			return null
		}
		return (
			<p className={this.props.className}>{this.props.message}</p>
		)
	}
}
