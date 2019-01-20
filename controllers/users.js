module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let getAllUsers = (request, response) => {
        response.send('all users displayed', {cookies: request.cookies});
    }


    let homepage = (request, response) => {
        db.users.getLocations(request, (err, result) => {
            response.render('../views/home', {savedLocations: result.savedCards, allLocations: result.allCards});
        })
    }

    let register = (request, response) => {
        if (request.body['register-username'] === "" || 
        (request.body['register-password'] !== request.body['register-password-confirm'])){
            response.redirect('/');
        }
        db.users.createNewUser(request, (err, result) => {
            response.cookie('loggedIn', true);
            response.cookie('username', result[0]['username']);
            response.cookie('user_id', result[0]['id']);
            response.redirect('back');
        })
    }

    let login = (request, response) => {
        db.users.checkUserLoginPassword(request, (err, result) => {
            if (result) {
                response.cookie('loggedIn', true);
                response.cookie('username', result[0]['username']);
                response.cookie('user_id', result[0]['id']);
                response.redirect('back');
            } else {
                response.redirect('back')
            }
        })

    }

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        getAllUsers,
        homepage,
        register,
        login
    };
}