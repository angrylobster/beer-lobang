module.exports = (app, db) => {
    const users = require('./controllers/users')(db);

    /*
     *  =========================================
     *  Routes for one controller
     *  =========================================
     */
    app.get('/users/all', users.getAllUsers);
    app.get('/', users.homepage);
    app.get('/users/map', users.getMap);
    app.post('/users/login', users.login);
    app.post('/users/register', users.register);
};