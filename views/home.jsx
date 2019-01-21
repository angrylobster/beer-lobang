var React = require('react');
var Default = require('./default');

class Home extends React.Component {
    render(){
        let uniquePlaces = [];
        this.props.results.forEach(result => {
            uniquePlaces.includes(result.place_id) ? null : uniquePlaces.push(result.place_id);
        })

        let modifiedResults = uniquePlaces.map(place => {
            return {
                place_id: place,
                beers: [],
                saved: 0
            }
        })

        modifiedResults.forEach(modifiedResult => {
            this.props.results.forEach(result => {
                if (modifiedResult.place_id === result.place_id){
                    if (!modifiedResult.beers.includes(result.name)){
                        modifiedResult.beers.push(result.name);
                    }
                    modifiedResult.saved++;
                }
            });
        });

        modifiedResults.sort((a,b) => {
            return b.saved - a.saved;
        })

        let cards = modifiedResults.map(result => {
            return <Card input={result} key={result.place_id}></Card>
        })
        let userCards = "";
        let userSection = "";
        if (this.props.cookies.username){
            userCards = this.props.userResults.map(result => {
                return <Card input={result} key={result.place_id}></Card>
            })
            userSection = (
                <section>
                    <h2>{this.props.username}'s Lobangs</h2>
                    <div className="card-deck pt-3">
                        {userCards}
                    </div>
                </section>
            )
        }

        return (
            <Default loggedIn={this.props.cookies ? this.props.cookies['loggedIn'] : null}>
                <script async defer src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC-tEAh56qJBnYr7WTsvWyPqa1G9lRPpCc&libraries=places&callback=cardHandler`}></script>

                {userSection}

                <section>
                    <h2>Sibei Popular Lobangs</h2>
                    <div className="card-deck pt-3">
                        {cards}
                    </div>
                </section>
            </Default>
        )
    }
}

class Card extends React.Component {
    render(){
        return (
            <div className="col-sm-12 col-md-6 col-lg-3 card-wrapper" style={{margin: '13px 0px 13px 0px'}} id={this.props.input.place_id}>
                <a href="">
                    <div className="card">
                        <img src="" className="card-img-top" style={{height: '300px', objectFit: 'cover'}}/>
                        <div className="card-body">
                            <h4 className="card-title"></h4>
                            <p className="card-text block-with-text"></p>
                            {this.props.input.beers ? (<p>Beers saved by users: {this.props.input.beers.join(', ')}</p>) : null}
                        </div>
                        <div className="card-footer">
                            <small>{this.props.input.saved} user(s) have saved this location.</small>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

module.exports = Home;