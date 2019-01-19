const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');

module.exports = (dbPoolInstance) => {
    let add = (request, callback) => {
        const query = 'INSERT INTO locations (place_id, user_id) VALUES ($1, $2) RETURNING *';
        const values = [request.body['place_id']];
        if (request.cookies['loggedIn'] === 'true') {
            values.push(request.cookies['user_id']);
        } else {
            values.push(null);
        }
        dbPoolInstance.query(query, values, (err, result) => {
            callback(null, result.rows);
        });
    }
    
    let getUsersLocations =  (request, callback) => {
        const query = 'SELECT * FROM locations WHERE (user_id=$1)';
        const values = [parseInt(request.params.id)];
        dbPoolInstance.query(query, values, (err, result) => {
            callback(null, result.rows);
        });
    }

    return{
        add,
        getUsersLocations
    };
};

