var React = require('react');
var Default = require ('./default');

class Map extends React.Component {
  render() {
    return (
      <Default loggedIn={this.props.loggedIn}>
        <input id="search-input" className="controls" type="text" placeholder="Search Box"/>
        <div id="map"></div>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC-tEAh56qJBnYr7WTsvWyPqa1G9lRPpCc&libraries=places&callback=initMap"></script>
        <script defer src='/googlemaps.js'></script>
      </Default>
    );
  }
}
module.exports = Map;