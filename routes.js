module.exports = (app, db) => {
    const users = require('./controllers/users')(db);
    const locations = require('./controllers/locations')(db);

    /*
     *  =========================================
     *  Routes for one controller
     *  =========================================
     */
    app.get('/users/all', users.getAllUsers);
    app.get('/', users.homepage);
    app.get('/users/map', users.getMap);
    app.get('/locations/:id', locations.getUsersLocations);
    app.post('/users/login', users.login);
    app.post('/users/register', users.register);
    app.post('/locations/add', locations.add);
};