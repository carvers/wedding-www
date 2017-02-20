import React from 'react'
import Moon from '../Moon'
import {Link, IndexLink} from 'react-router'
import styles from './styles.css'

export default class NavBar extends React.Component {
	render() {
		return (
			<nav className={styles.bar}>
				<ul className={styles.menu + ' ' + styles.overMoon}>
					<li><IndexLink activeClassName={styles.activeLink} to="/">Home</IndexLink></li>
					<li><Link activeClassName={styles.activeLink} to="/about">Details</Link></li>
					<li><Link activeClassName={styles.activeLink} to="/travel">Travel</Link></li>
					<li><Link activeClassName={styles.activeLink} to="/registry">Registry</Link></li>
				</ul>
				<Moon className={styles.moon} />
				<ul className={styles.menu + ' ' + styles.underMoon}>
					<li><IndexLink activeClassName={styles.activeLink} to="/">Home</IndexLink></li>
					<li><Link activeClassName={styles.activeLink} to="/about">Details</Link></li>
					<li><Link activeClassName={styles.activeLink} to="/travel">Travel</Link></li>
					<li><Link activeClassName={styles.activeLink} to="/registry">Registry</Link></li>
				</ul>
				<div className={styles.clear} />
			</nav>
		)
	}
}
