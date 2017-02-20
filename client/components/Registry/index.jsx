import React from 'react'
import DocumentTitle from 'react-document-title'

export default class About extends React.Component {
	render() {
		return (
			<DocumentTitle title='Registry Information'>
				<article className='content'>
					<h2 className='title'>Registry Information</h2>
					<p>We&rsquo;re registered on:</p>
					<ul>
						<li><a href='https://smile.amazon.com/wedding/share/carvers' title='Amazon'>Amazon</a></li>
						<li><a href='https://thankfulregistry.com/carvers' title='Thankful'>Thankful</a> (charity, honeymoon, assorted items)</li>
						<li><a href='https://www.bedbathandbeyond.com/store/giftregistry/view_registry_guest.jsp?eventType=Wedding&registryId=544152676' title='Bed Bath & Beyond'>Bed Bath &amp; Beyond</a> (the link is to our registry, or we're registered under Ethan Carver and Paddy Foran in Washington State. The store should be able to find us. Our registry ID is 544152676.)</li>
					</ul>
					<p>We know a lot of our guests will be traveling from out of town, so all of these registries will allow gifts to be shipped at little or no cost, and have been configured with our shipping address.</p>
				</article>
			</DocumentTitle>
		)
	}
}
