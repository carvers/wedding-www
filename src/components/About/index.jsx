import React from 'react'
import DocumentTitle from 'react-document-title'

export default class About extends React.Component {
	render() {
		return (
			<DocumentTitle title='About the Wedding'>
				<article className='content'>
					<h2 className='title'>About the Wedding</h2>
					<h3 className='subsection' id='venue'>Venue Information</h3>
					<p>The wedding and ceremony will both be held at <a href='https://goo.gl/maps/V3PtWPLAmP62' title='The Moore Mansion on Google Maps'>the Moore Mansion</a>, 200 North 34 Road, in Pasco, Washington. We will be arranging transport from the Best Western to the Mansion. The Mansion also has plenty of parking; if you&rsquo;re driving, please look for signs at the venue to direct you where to park.</p>
					<h3 className='subsection' id='itinerary'>Schedule</h3>
					<ul>
						<li>The venue will not be accepting wedding guests before <strong>4:45pm</strong>. Please don&rsquo;t show up before then!</li>
						<li>Please try to arrive by <strong>5:15pm</strong>, when the procession will begin. It'll be super awkward to show up in the middle of the procession.</li>
						<li>Following the ceremony, we'll be doing photographs with family and friends. Please enjoy the hors d'oeuvres and open bar; we'll find the people necessary for the photos as they're needed. Enjoy each other's company!</li>
						<li>We expect dinner to begin around <strong>6:30 or 7:00pm</strong>, after the completion of the photos.</li>
						<li>After dinner, we'll have the first dance and mother/son dances. At which point, everyone is welcome (and <em>expected</em>) on the dance floor.</li>
						<li>We will be serving cake around <strong>8:30pm</strong>.</li>
						<li>The music will stop at <strong>11:30pm</strong>, at which point we will begin to head home from the venue. Everyone and their personal effects must be out of the Mansion by midnight; the only exception is vehicles. If it is unsafe for you to drive home, we hope you will take a shuttle, call a cab, or carpool. Your car can remain in the Mansion's parking lot until noon the next day.</li>
					</ul>
					<h3 className='subsection' id='faq'>FAQ</h3>
					<ul>
						<li><strong>What should I wear?</strong>
							<p>The grooms will be in suits, but this is decidedly an informal and fun event, first and foremost. Black tie is certainly not required, and we're going to be outside, so please keep that in mind. Also, it is going to be hot; jackets are totally welcome, but we're planning on taking ours off pretty quickly. At the end of the day, our biggest concern is that you are comfortable and happy; everything else is extra.</p>
						</li>
						<li><strong>Are my kids invited?</strong>
							<p>Of course! Kids are absolutely welcome. Also, we know kids can be excitable during weddings; we definitely were as kids, and we're almost certainly going to be excitable ourselves. If we get to be excited and have fun, it's only fair that the kids do, too. The only ask is that you help keep the grounds of the Mansion nice; our host works hard to maintain it, and kids stepping on flowers and otherwise damaging the grounds will create a lot of extra work for them.</p>
						</li>
						<li><strong>What about rain?</strong>
							<p>In the last 20 years, it has rained on July 8<sup>th</sup> exactly twice, so we're not super concerned about it. On the off-chance it does rain, the festivities will be moved inside the pavillion on the Mansion's grounds.</p>
						</li>
						<li><strong>What&rsquo;s the bar situation like?</strong>
							<p>We&rsquo;ll be providing an open bar, complete with liquor, during the cocktail hour before dinner. Once everyone is seated for dinner, the bar will continue to be open and free, but will only be serving wines and beers for the rest of the night.</p>
						</li>
						<li><strong>I have a question that wasn't answered!</strong>
							<p><a href='mailto:grooms@carvers.co' title='Email the grooms'>Ask the grooms.</a></p>
						</li>
					</ul>
				</article>
			</DocumentTitle>
		)
	}
}
