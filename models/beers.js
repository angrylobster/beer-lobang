module.exports = (dbPoolInstance) => {

    let add = (request, callback) => {
        const query = `INSERT INTO beers (name, user_id, location_id) VALUES ($1,$2,$3) RETURNING *`;
        let price = parseFloat(request.body.price.split('').map(character => {
            if (!isNaN(character) || character === '.') {
                return character;
            }
        }).join(""));
        const values = [request.body.beer, request.cookies.user_id, request.body.location_id];
        dbPoolInstance.query(query, values, (err, result) => {
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
    }

    let getAllBeerNames = (request, callback) => {
        const query = `SELECT DISTINCT name FROM beers`;
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
    }

    return {
        add,
        getAllBeerNames
    };
}