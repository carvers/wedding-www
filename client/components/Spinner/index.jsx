import React from 'react'
import loadingStyles from './styles.css'

export default class RSVPAdminSpinner extends React.Component {
	isLoading(loading) {
		for (const s in loading) {
			for (const i in loading[s]) {
				if (loading[s][i]) {
					return true
				}
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
