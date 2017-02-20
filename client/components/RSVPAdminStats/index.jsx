import React from 'react'
import styles from './styles.css'
import {Pie} from 'react-chartjs'

export default class RSVPAdminStats extends React.Component {
	render() {
		const chartData = {
			labels: ['Coming', 'No Response', 'Not Coming'],
			datasets: [
				{
					data: [this.props.coming, this.props.noResponse, this.props.notComing],
					backgroundColor: ['#869260', '#dfb563', '#914f50'],
					hoverBackgroundColor: ['#566b42', '#d2a152', '#7d3d3e'],
				}
			]
		}
		const chartOptions = {
			maintainAspectRatio: false,
			legend: {
				display: false,
			},
		}
		return (
			<div className={styles.container}>
				<table className={styles.totals}>
					<tbody>
						<tr>
							<td className={styles.numbers}>{this.props.coming}</td><td>Coming</td>
						</tr>
						<tr>
							<td className={styles.numbers}>{this.props.noResponse}</td><td>Not Responded</td>
						</tr>
						<tr>
							<td className={styles.numbers}>{this.props.notComing}</td><td>Not Coming</td>
						</tr>
					</tbody>
				</table>
				<div className={styles.chart}>
					<Pie data={chartData} options={chartOptions} />
				</div>
			</div>
		)
	}
}
