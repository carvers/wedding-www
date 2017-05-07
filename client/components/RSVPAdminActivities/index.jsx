import React from 'react'
import styles from './styles.css'
import {Bar} from 'react-chartjs'

export default class RSVPAdminActivities extends React.Component {
	render() {
		const chartData = {
			labels: ['Hiking', 'Kayaking', 'Jetski', "Fishing", "Hanford", "LIGO", "REACH", "Bechtel", "Wine Tour", "Escape Room"],
			datasets: [
				{
					data: [this.props.hiking, this.props.kayaking, this.props.jetski, this.props.fishing, this.props.hanford, this.props.ligo, this.props.reach, this.props.bechtel, this.props.wine, this.props.escapeRoom],
					borderColor: '#fff',
					borderWidth: 1,
					backgroundColor: 'rgba(0,0,0,0)',
				}
			]
		}
		const chartOptions = {
			legend: {
				display: false,
			},
			maintainAspectRatio: false,
			scales: {
				yAxes: [{
					ticks: {
						fontColor: '#fff',
						fontFamily: 'Palanquin, sans-serif',
					},
					gridLines: {
						color: '#fff',
						drawOnChartArea: false,
					},
				}],
				xAxes: [{
					ticks: {
						fontColor: '#fff',
						fontFamily: 'Palanquin, sans-serif',
					},
					gridLines: {
						color: '#fff',
						drawOnChartArea: false,
					},
				}]
			}
		}
		return (
			<div className={styles.container}>
				<div className={styles.chart}>
					<Bar data={chartData} options={chartOptions} />
				</div>
			</div>
		)
	}
}
