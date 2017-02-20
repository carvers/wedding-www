import React, { PropTypes } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import NavBar from '../../components/NavBar'
//import Spinner from '../../components/Spinner'
import styles from './styles.css'

// Favicon link is in the template, this just makes webpack package it up for us
import './sky.png'
import './favicon-16x16.png'
import './favicon-32x32.png'
import './apple-touch-icon.png'

class App extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }

	constructor(props, context) {
		super(props, context)
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

const mapStateToProps = state => {
	return {}
}

export default connect(mapStateToProps)(App)
