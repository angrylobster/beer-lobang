const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
module.exports = (dbPoolInstance) => {

    let register = (request, callback) => {
        const query = 'INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *';
        const values = [request.body['register-username'], sha256(request.body['register-password'])];
        dbPoolInstance.query(query, values, (err, result) => {
            callback(null, result.rows);
        });
    }

    let login = (request, callback) => {
        let query = `SELECT * FROM users WHERE (username=$1 AND password=$2)`;
        let values = [request.body['login-username'], sha256(request.body['login-password'])];
        dbPoolInstance.query(query, values, (err, result) => {
            if (err){
                console.error('query error: ' + err.stack);
                callback(err, null);
            } 
            if (result.rows.length === 0){
                callback(null, null)
            } else {
                callback(null, result.rows);
            }
        })
    }


    return{
        register,
        login
    };
};

