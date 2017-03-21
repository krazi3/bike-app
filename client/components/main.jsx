import React, { Component } from 'react';
import axios from 'axios';
import Map from './map.jsx';
import UsageGraph from './usage_graph.jsx';

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stations: [],
      station_status: [],
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
        station_status: results[1].data.data.stations
      })
    })
  }
  render() {
    return (
      <div>
        <Map stations={this.state.stations} stationStatus={this.state.station_status}/>
        <UsageGraph stations={this.state.stations} stationStatus={this.state.station_status}/>
      </div>
    )
  }
}
