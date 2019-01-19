module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let getAllUsers = (request, response) => {
        response.send('all users displayed', {cookies: request.cookies});
    }

    let getMap = (request, response) => {
        db.users.getMap(request, (err, result) => {
            if (result === null){
                response.render('../views/map');
            } else {
                response.render('../views/map', {cookies: request.cookies, savedLocations: result});
            }
        })
    }

    let homepage = (request, response) => {
        response.render('../views/default', {cookies: request.cookies});
    }

    let register = (request, response) => {
        if (request.body['register-username'] === "" || 
        (request.body['register-password'] !== request.body['register-password-confirm'])){
            response.redirect('/');
        }
        db.users.register(request, (err, result) => {
            response.cookie('loggedIn', true);
            response.cookie('username', result[0]['username']);
            response.cookie('user_id', result[0]['id']);
            response.redirect('/');
        })
    }

    let login = (request, response) => {
        db.users.login(request, (err, result) => {
            if (result) {
                response.cookie('loggedIn', true);
                response.cookie('username', result[0]['username']);
                response.cookie('user_id', result[0]['id']);
                response.redirect('/');
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
        getMap,
        homepage,
        register,
        login
    };
}