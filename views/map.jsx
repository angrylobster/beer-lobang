var React = require('react');
var Default = require ('./default');

class Map extends React.Component {
  

  render() {
    let beers = "";
    if (this.props.beers) {
      beers = this.props.beers.map(beer => {
        return '"'+ beer.name + '"'
      }).join();
    }
    return (
      <Default loggedIn={this.props.cookies ? this.props.cookies['loggedIn'] : null}>
        <input id="search-input" className="controls" type="text" placeholder="Search Box"/>
        <div id="map" userid={this.props.cookies ? this.props.cookies['user_id'] : null}></div>
        <script dangerouslySetInnerHTML={{__html: 'savedLocations='+ JSON.stringify(this.props.savedLocations ?this.props.savedLocations : null) + `; var beers=[${beers}]`}}></script>
        <script async defer src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC-tEAh56qJBnYr7WTsvWyPqa1G9lRPpCc&libraries=places&callback=initMap`}></script>
      </Default>
    );
  }
}
module.exports = Map;