import React, { Component } from 'react';
import chart from 'chart.js';

export default class UsageGraph extends Component {
  handleChange(event) {
    if(event.target.value == "all") {
      this.chart.data.datasets[0].data[0] = this.total_available;
      this.chart.data.datasets[0].data[1] = this.total;
    } else {
      this.chart.data.datasets[0].data[0] = this.props.stationStatus[event.target.value].num_bikes_available;
      this.chart.data.datasets[0].data[1] = this.props.stations[event.target.value].capacity - this.props.stationStatus[event.target.value].num_bikes_available;
    }
    this.chart.update();
  }
  render() {
    return (
      <div>
        <select name="station" onChange={e => this.handleChange(e)}>
          <option value="all">All stations</option>
            {this.props.stations.map((station, index) => <option key={index} value={index}>{station.name}</option>)}
        </select>
        <div style={{width: 500, height: 500}}>
          <canvas ref="chart" width="400" height="400"></canvas>
        </div>
      </div>
    )
  }
  componentDidUpdate() {
    this.total = 0;
    this.total_available = 0;
    this.props.stations.forEach((station, index) => {
      this.total += station.capacity
      this.total_available += this.props.stationStatus[index].num_bikes_available
    })
    this.chart = new Chart(this.refs.chart, {
      type: 'pie',
      data: {
        labels: ['Available', 'Occupied'],
        datasets: [{
          data: [this.total_available, this.total - this.total_available],
          backgroundColor: [
            '#29B6F6',
            '#ef5350',
          ]
        }]
      }
    })
  }
}
