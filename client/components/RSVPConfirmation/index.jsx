import React from 'react'
import {Link} from 'react-router'
import DocumentTitle from 'react-document-title'

export default class RSVPConfirmation extends React.Component {
	render() {
		return (
			<DocumentTitle title='RSVP'>
				<article className='content'>
					<h2 className='title'>RSVP Confirmed</h2>
					<p>Thanks for RSVPing! If you need to change your answers&mdash;or remember what they were&mdash;just come back to <Link to='/rsvp'>wedding.carvers.co/rsvp</Link> and enter your code word again.</p>
				</article>
			</DocumentTitle>
		)
	}
}
