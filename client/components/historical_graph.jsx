import React, { Component } from 'react';
import Chart from 'chart.js';
import moment from 'moment';

export default class HistoricalGraph extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.nextStationStatus.data) {
      this.data.push(nextProps.nextStationStatus)
    } else if(nextProps.stationStatus.data) {
      this.data.push(nextProps.stationStatus)
    }
  }
  handleChange(event) {
    this.current = event.target.value;
    if(event.target.value == "all") {
      this.chart.data.datasets[0].data = this.total;
    } else {
      this.chart.data.datasets[0].data = []
      this.data.forEach((stationStatus, index) => {
        this.chart.data.datasets[0].data.push(this.props.stations[index].capacity - stationStatus.data.stations[this.current].num_bikes_available)
      })
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
  componentDidMount() {
    this.data = [];
    this.total = [];
    this.labels = [];
    this.chart = new Chart(this.refs.chart, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.total,
          label: 'Bikes in Use',
          lineTension: 0,
        }],
      }
    })
  }
  componentDidUpdate() {
    var capacity = 0, free = 0;
    this.props.stations.forEach((station, index) => {
      capacity += station.capacity;
      free += this.data[this.data.length - 1].data.stations[index].num_bikes_available;
    })
    this.total.push(capacity - free)
    this.labels.push(moment(this.data[this.data.length - 1].last_updated*1000).format('LTS'))
    if(this.current && this.current != 'all') {
      this.chart.data.datasets[0].data.push(this.props.stations[this.current].capacity - this.data[this.data.length - 1].data.stations[this.current].num_bikes_available)
    }
    this.chart.update()
  }
}
