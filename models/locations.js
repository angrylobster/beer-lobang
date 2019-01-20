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
    
    let getUsersLocations =  (request, callback) => {
        const query = 'SELECT * FROM locations WHERE (user_id=$1)';
        const values = [parseInt(request.params.id)];
        dbPoolInstance.query(query, values, (err, result) => {
            callback(null, result.rows);
        });
    }

    let deleteLocation = (request, callback) => {
        const query = 'DELETE FROM locations WHERE (place_id=$1 AND user_id=$2)'
        const values = [request.params.locationid, request.params.userid];
        dbPoolInstance.query(query, values, (err, result) => {
            callback(null, result.rows);
        })
    }

    return{
        add,
        getUsersLocations,
        deleteLocation
    };
};

