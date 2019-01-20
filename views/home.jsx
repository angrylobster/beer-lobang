var React = require('react');
var Default = require('./default');

class Home extends React.Component {
    render(){
        return (
            <Default loggedIn={this.props.cookies ? this.props.cookies['loggedIn'] : null}>
            </Default>
        )
    }
}

module.exports = Home;