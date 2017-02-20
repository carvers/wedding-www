import React from 'react'
import phase from './phase'
import moonImg from './moon.png'
import styles from './styles.css'

function calculateArcs(phaseVal) {
	let arcs = {}
	if (phaseVal <= 0.25) {
		arcs.sweep0 = 1
		arcs.sweep1 = 0
		arcs.rx = 124.09 - 124.09 * phaseVal * 4
	} else if (phaseVal <= 0.50) {
		arcs.sweep0 = 0
		arcs.sweep1 = 0
		arcs.rx = 124.09 * (phaseVal - 0.25) * 4
	} else if (phaseVal <= 0.75) {
		arcs.sweep0 = 1
		arcs.sweep1 = 1
		arcs.rx = 124.09 - 124.09 * (phaseVal - 0.50) * 4
	} else {
		arcs.sweep0 = 0
		arcs.sweep1 = 1
		arcs.rx = 124.09 * (phaseVal - 0.75) * 4
	}
	return arcs
}

class Moon extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let arc = calculateArcs(phase(this.props.date))
		return (
			<div className={this.props.className}>
				<svg viewBox="0 0 248.18 248.18">
					<defs>
						<clipPath id="clip-path">
							<path d={'m124.09,0 a'+arc.rx+',124.09 0 1,'+arc.sweep0+' 0,248.18 a124.09,124.09 0 1,'+arc.sweep1+' 0,-248.18'}></path>
						</clipPath>
						<radialGradient id="radial-gradient" cx="3175.74" cy="-300.68" r="92.82" gradientTransform="translate(4369.83 -277.9) rotate(180) scale(1.34 1.34)" gradientUnits="userSpaceOnUse">
							<stop offset="0" stopColor="#fff"/>
							<stop offset="0.17" stopColor="#fffef7" stopOpacity="0.79"/>
							<stop offset="0.45" stopColor="#fffde9" stopOpacity="0.45"/>
							<stop offset="0.69" stopColor="#fffddf" stopOpacity="0.21"/>
							<stop offset="0.86" stopColor="#fffcd9" stopOpacity="0.06"/>
							<stop offset="0.94" stopColor="#fffcd7" stopOpacity="0"/>
						</radialGradient>
					</defs>
					<g clipPath='url(#clip-path)'>
						<image width="673" height="674" transform="scale(0.37)" xlinkHref={moonImg}/>
						<circle className={styles.cls3} cx="124.09" cy="124.09" r="124.09"/>
					</g>
				</svg>
			</div>
		)
	}
}

Moon.propTypes = {
	date: React.PropTypes.instanceOf(Date),
	className: React.PropTypes.string
}

Moon.defaultProps = {
	date: new Date(),
	className: ''
}

export default Moon
