const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');

module.exports = (dbPoolInstance) => {
    let add = (request, callback) => {
        const query = 'INSERT INTO locations (place_id, user_id) VALUES ($1, $2) RETURNING *';
        const values = [request.params.id];
        if (request.cookies['loggedIn'] === 'true') {
            values.push(request.cookies['user_id']);
            dbPoolInstance.query(query, values, (err, result) => {
                callback(null, result.rows);
            });
        }
    }

    let getUsersLocations = (request, callback) => {
        const query = 'SELECT * FROM locations WHERE (user_id=$1)';
        const values = [parseInt(request.params.id)];
        dbPoolInstance.query(query, values, (err, result) => {
            callback(null, result.rows);
        });
    }

    let deleteLocation = (request, callback) => {
        const query = 'DELETE FROM locations WHERE (place_id=$1 AND user_id=$2)';
        const values = [request.params.locationid, request.params.userid];
        dbPoolInstance.query(query, values, (err, result) => {
            callback(null, result.rows);
        })
    }

    let getLocationsByUser = (request, callback) => {
        if (request.cookies['loggedIn']) {
            const query = `SELECT * FROM locations INNER JOIN beers ON (locations.user_id=beers.user_id AND locations.id=beers.location_id) WHERE locations.user_id=${request.cookies['user_id']}`;
            dbPoolInstance.query(query, (err, result) => {
                if (err) {
                    console.error('query error:' + err.stack);
                    callback(err, null);
                }
                if (result.rows) {
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            })
        } else {
            callback(null, null);
        }
    }

    let getAllLocationsAndBeers = (request, callback) => {
        const query = `SELECT locations.place_id, beers.name, beers.price, beers.user_id, users.username FROM ((locations INNER JOIN beers ON locations.id=beers.location_id) INNER JOIN users ON beers.user_id=users.id)`;
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.error('query error: ' + err.stack);
                callback(err, null);
            }
            if (result.rows) {
                callback(null, result.rows);
            } else {
                callback(null, null);
            }
        })
    }

    return {
        add,
        getUsersLocations,
        getLocationsByUser,
        getAllLocationsAndBeers,
        deleteLocation
    };
};