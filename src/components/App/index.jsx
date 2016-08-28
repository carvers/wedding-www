import React, { PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import Moon from '../Moon'
import styles from './styles.css'

// Favicon link is in the template, this just makes webpack package it up for us
import './sky.jpg'
import './favicon-16x16.png'
import './favicon-32x32.png'
import './apple-touch-icon.png'

function requestedDay(addedHours) {
	let d = new Date()
	d.setTime(d.getTime() + (addedHours*60*60*1000))
	return d
}

export class Home extends React.Component {
	constructor(props) {
		super(props)
		this.onSliderInput = this.onSliderInput.bind(this)
		this.state = {
			addedHours: 0
		}
	}

  render() {
    return (
			<div className={styles.sky + ' ' + styles.fullDiv}>
				<div className={styles.fullDiv}>
					<Moon date={requestedDay(this.state.addedHours)} className={styles.moon} />
					<h1 className={styles.day}>{requestedDay(this.state.addedHours).toLocaleDateString('en-us', {weekday: 'long', year: 'numeric', month: 'long', 'day': 'numeric'})}</h1>
					<p><input type='range' className={styles.slider} onChange={this.onSliderInput} min='0' max='8760' defaultValue='{this.state.addedHours}' /></p>
				</div>
			</div>
    )
  }

	onSliderInput(event) {
		this.setState({'addedHours': parseInt(event.target.value)})
	}
}

export class NotFound extends React.Component {
  render() {
    return (
			<h1>Not found</h1>
    )
  }
}

/**
 * NOTE: As of 2015-11-09 react-transform does not support a functional
 * component as the base compoenent that's passed to ReactDOM.render, so we
 * still use createClass here.
 */
export class App extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }
  render() {
    return (
      <div className={styles.fullDiv}>
        {this.props.children}
      </div>
    )
  }
}
