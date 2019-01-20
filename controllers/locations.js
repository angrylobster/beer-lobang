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

    let renderMap = (request, response) => {
        db.locations.getLocationsByUser(request, (err, result) => {
            console.log(result)
            if (result === null){
                response.render('../views/map');
            } else {
                response.render('../views/map', {
                    cookies: request.cookies, 
                    savedLocations: result
                });
            }
        })
    }

    let renderHomepage = (request, response) => {
        db.locations.getLocationsByUser(request, (err, result) => {
            
            response.render('../views/home', {cookies: request.cookies})
        })
    }

    let getUsersLocations = (request, response) => {
        db.locations.getUsersLocations(request, (err, result) => {
            response.send(result);
        })
    }

    let deleteLocation = (request, response) => {
        console.log(request.params)
        db.locations.deleteLocation(request, (err, result) => {
            response.redirect('back');
        })
    }

    /*
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */

    return {
        add,
        getUsersLocations,
        deleteLocation,
        renderHomepage,
        renderMap
    };
}