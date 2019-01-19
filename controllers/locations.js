module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let add = (request, response) => {
        db.locations.add(request, (err, result) => {
            response.redirect('/users/map');
        })
    }

    let getUsersLocations = (request, response) => {
        db.locations.getUsersLocations(request, (err, result) => {
            response.send(result);
        })
    }

    /*
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */

    return {
        add,
        getUsersLocations
    };
}