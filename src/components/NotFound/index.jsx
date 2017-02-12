import React from 'react'
import DocumentTitle from 'react-document-title'

export default class NotFound extends React.Component {
  render() {
		return (
			<DocumentTitle title='You look lost.'>
				<article className='content'>
					<h2 className='title'>You look lost.</h2>

					<p>

						And that&rsquo;s OK! To tell you the truth, it&rsquo;s probably our
						fault&mdash;&ldquo;second star to the right&rdquo; isn&rsquo;t
						incredibly helpful, as far as directions go. But whatever
						you&rsquo;re looking for&hellip; well, it isn&rsquo;t here. To get
						back on track, just check out one of those links in the navigation,
						above. Or talk to one of the grooms, they&rsquo;ll be happy to help.

					</p>

				</article>
			</DocumentTitle>
    )
  }
}
