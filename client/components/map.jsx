import React, { Component } from 'react';

export default class Map extends Component {
  render() {
    return (
      <div ref="map" style={{height: 500, width: '100%'}}></div>
    )
  }
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: {lat: 40.712800, lng: -74.005900}
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
    })
  }
}
