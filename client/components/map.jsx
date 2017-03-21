import React, { Component } from 'react';

export default class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      station: '',
      distance: '',
    }
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  search(event) {
    event.preventDefault();

    if(!this.state.station || !this.state.distance) {
      return false;
    }
    var center = {lat: this.props.stations[this.state.station].lat, lng: this.props.stations[this.state.station].lon}
    this.map.panTo(center)
    this.markers[this.state.station].setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
    this.circle = new google.maps.Circle({
      center,
      map: this.map,
      visible: false,
      radius: this.state.distance * 1000
    })
    var bounds = this.circle.getBounds();
    this.markers.forEach((marker, index) => {
      if(!bounds.contains(marker.getPosition())) {
        marker.setMap(null)
      } else {
        marker.setMap(this.map)
      }
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={e => this.search(e)}>
          <select name="station" value={this.state.station} onChange={e => this.handleChange(e)}>
            <option value=''>Select station</option>
              {this.props.stations.map((station, index) => <option key={index} value={index}>{station.name}</option>)}
          </select>
          <input type="text" name="distance" placeholder="Distance(kms)" value={this.state.distance} onChange={e => this.handleChange(e)}/>
          <button>Search</button>
        </form>
        <div ref="map" style={{height: 500, width: '100%'}}></div>
      </div>
    )
  }
  componentDidMount() {
    this.markers = []
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: {lat: 40.712800, lng: -74.005900}
    });
  }
  componentDidUpdate() {
    this.props.stations.forEach((station, index) => {
      var bikesAvailable = parseInt(this.props.stationStatus[index].num_bikes_available/station.capacity * 100)
      if(!bikesAvailable) {
        var icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      } else if(bikesAvailable >= 75) {
        var icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      } else if(bikesAvailable < 75 && bikesAvailable >= 50) {
        var icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      } else if(bikesAvailable < 50) {
        var icon = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
      }
      var marker = new google.maps.Marker({
        position: {lat: station.lat, lng: station.lon},
        map: this.map,
        icon,
      });
      this.markers.push(marker)
    })
  }
}
