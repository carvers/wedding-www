import React, { PropTypes } from 'react'
import DocumentTitle from 'react-document-title'
import NavBar from '../NavBar'
import styles from './styles.css'

// Favicon link is in the template, this just makes webpack package it up for us
import './sky.png'
import './favicon-16x16.png'
import './favicon-32x32.png'
import './apple-touch-icon.png'

/**
 * NOTE: As of 2015-11-09 react-transform does not support a functional
 * component as the base compoenent that's passed to ReactDOM.render, so we
 * still use createClass here.
 */
export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }
  render() {
    return (
			<DocumentTitle title='Paddy & Ethan Are Getting Married!'>
				<div className={styles.sky +' '+styles.fullDiv}>
					<NavBar />
					{this.props.children}
					<footer></footer>
				</div>
			</DocumentTitle>
    )
  }
}
