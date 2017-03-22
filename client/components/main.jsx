import React, { Component } from 'react';
import axios from 'axios';
import Map from './map.jsx';
import UsageGraph from './usage_graph.jsx';
import HistoricalGraph from './historical_graph.jsx';

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stations: [],
      station_status: {
        data: {
          stations: []
        }
      },
      next_station_status: [],
    }
  }
  componentWillMount() {
    Promise.all([
      axios.get('https://gbfs.citibikenyc.com/gbfs/en/station_information.json'),
      axios.get('https://gbfs.citibikenyc.com/gbfs/en/station_status.json')
    ])
    .then(results => {
      this.setState({
        stations: results[0].data.data.stations,
        station_status: results[1].data
      })
      setInterval(() => {
        axios.get('https://gbfs.citibikenyc.com/gbfs/en/station_status.json')
          .then(response => this.setState({next_station_status: response.data}))
      }, 10000)
    })
  }
  render() {
    return (
      <div className="container">
        <h2>NYC Bike Sharing Dashboard</h2>
        <Map stations={this.state.stations} stationStatus={this.state.station_status.data.stations}/>
        <div className="row">
          <div className="col-sm-6">
            <UsageGraph stations={this.state.stations} stationStatus={this.state.station_status.data.stations}/>
          </div>
          <div className="col-sm-6">
            <HistoricalGraph stations={this.state.stations} stationStatus={this.state.station_status} nextStationStatus={this.state.next_station_status}/>
          </div>
        </div>
      </div>
    )
  }
}
