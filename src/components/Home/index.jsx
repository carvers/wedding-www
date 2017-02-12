import React from 'react'
import {Link} from 'react-router'

export default class Home extends React.Component {
  render() {
    return (
			<article className='content'>
				<h2 className='title'>Paddy &amp; Ethan Are Getting Married!</h2>
				<h3 className='subsection'>Basic Info</h3>
				<p>
					
					We&rsquo;re super excited to be getting married at <a href="https://mooremansion.com">The
						Moore Mansion</a>, in Tri-Cities, Washington. We&rsquo;ll have a (very)
					brief ceremony followed by a (not-so-brief) party on the Mansion&rsquo;s lawn on July
					8<sup>th</sup>, 2017. The whole thing kicks off at 5:00pm, and will end when Paddy&rsquo;s
					done dancing.

				</p> <p>
					
					We&rsquo;ve got <Link to="/about">some more details</Link> if you want &rsquo;em, but
					really, our biggest concern is that everyone is comfortable and has a good time, so try
					not to worry too much. If you&rsquo;re happy, we&rsquo;re probably happy.

				</p>

				<h3 className='subsection'>Meet The Grooms</h3>
				<p>

					Paddy is a software engineer. He argues with computers, and people pay him for it. We
					don&rsquo;t get it, either. It&rsquo;s super easy to &ldquo;nerdsnipe&rdquo; him by giving
					him an interesting problem; he won&rsquo;t be able to stop thinking about it until he
					solves it. He&rsquo;s kind of a kid, and loves to read and bake cupcakes.
				
				</p> <p>

					Ethan is an animal control officer. So he&rsquo;s the villain in pretty much every movie
					ever made about a dog. He&rsquo;s kind of an animal nerd, and was very upset the Mansion
					wouldn&rsquo;t let him have any pets in his wedding party. He&rsquo;s a huge book nerd,
					too, but he can also be found working in the garden or playing with our puppy.

				</p> <p>

					Paddy and Ethan met in college, where Ethan was Paddy&rsquo;s <a
						href="https://en.wikipedia.org/wiki/Resident_Assistant">RA</a> during their sophomore
					year. They struck up a friendship, and people had an annoying habit of just assuming they
					were dating. They remained friends as Paddy left Canisius and Ethan graduated, though
					things started looking bleak as Paddy started planning to move to San Francisco for his
					job. Then the job changed their minds and let him live wherever he wanted, so he moved in
					as Ethan&rsquo;s roommate. Six months later, <em>right</em> after Paddy had finally
					convinced his parents they weren&rsquo;t dating, they started dating. Six months later,
					Paddy switched jobs, and they moved to Brooklyn. A year later, Paddy asked Ethan to marry
					him at <em>Cabaret</em>, and Ethan said &ldquo;how stupid do you think I am?&rdquo;
					Kidding, Ethan said yes. Nine months later, they packed all their stuff in a moving
					truck, put the dog in the front with them, and moved from Brooklyn, NY to the Tri-Cities
					in Washington, largely because they felt like it. They&rsquo;ve lived there happily
					since, and are happy to call it &ldquo;home&rdquo;. 

				</p>
			</article>
    )
  }
}
