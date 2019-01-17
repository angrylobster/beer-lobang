module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let getAllUsers = (request, response) => {
        response.send('all users displayed', {loggedIn: request.cookies['loggedIn']});
    }

    let getMap = (request, response) => {
        response.render('../views/map', {loggedIn: request.cookies['loggedIn']});
    }

    let homepage = (request, response) => {
        response.render('../views/default', request.cookies);
    }

    let register = (request, response) => {
        if (request.body['register-username'] === "" || 
        (request.body['register-password'] !== request.body['register-password-confirm'])){
            response.redirect('/');
        }
        db.users.register(request, (err, result) => {
            console.log(result);
            response.cookie('loggedIn', true);
            response.cookie('username', result[0]['username']);
            // response.cookies('username', result.)
            response.render('../views/map');
        })
    }

    let login = (request, response) => {
        db.users.login(request, (err, result) => {
            response.cookie('loggedIn', true);
            response.cookie('username', result[0]['username']);
            response.render('../views/map');
        })

    }

    // let allTweeds = (request, response) => {
    //     db.users.getAllTweeds((error, tweeds) => {
    //         response.send('user/allTweeds', {tweeds})
    //     })
    // }
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