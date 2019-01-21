const pg = require('pg');
const users = require('./models/users');
const locations = require('./models/locations');
const beers = require('./models/beers');
const url = require('url');

const configs = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'beerlobang_db',
    port: 5432,
    password: 'postgres'
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});

module.exports = {
    /*
     * ADD APP MODELS HERE
     */

    // for the model
    users: users(pool),
    locations: locations(pool),
    beers: beers(pool),

    //make queries directly from here
    queryInterface: (text, params, callback) => {
        return pool.query(text, params, callback);
    },

    // get a reference to end the connection pool at server end
    pool: pool
};