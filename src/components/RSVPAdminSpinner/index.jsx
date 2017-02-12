import React from 'react'
import loadingStyles from './styles.css'

export default class RSVPAdminSpinner extends React.Component {
	isLoading(loading) {
		for (const s in loading) {
			if(loading[s]) {
				console.log(s, loading)
				return true
			}
		}
		return false
	}

	render() {
		if (!this.props.active) {
			return null
		}
		if (!this.isLoading(this.props.active)) {
			return null
		}
		return (
			<div className={loadingStyles.loading}>Loading&#8230;</div>
		)
	}
}
