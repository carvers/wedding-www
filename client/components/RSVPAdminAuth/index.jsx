import React from 'react'
import DocumentTitle from 'react-document-title'
import GoogleLogin from 'react-google-login'

import Error from '../Error'
import errorConsts from '../../errors'

import styles from './styles.css'

export default class RSVPAuth extends React.Component {
	static propTypes = {
		dispatch: React.PropTypes.func.isRequired,
	}

	process = (response) => {
		const { dispatch } = this.props
		dispatch(response.tokenObj.id_token)
	}

	processFailure = (response) => {
		console.log(response)
	}

	render() {
		return (
			<DocumentTitle title='RSVP Admin Login'>
				<GoogleLogin
					clientId='1056458701199-i7ehmjfmqcvkbspj79fvhqpb8d5o4nib.apps.googleusercontent.com'
					hostedDomain='carvers.co'
					responseType='id_token'
					buttonText='Login'
					onSuccess={this.process}
					onFailure={this.processFailure}
				/>
			</DocumentTitle>
		)
	}
}
