module.exports = (app, db) => {
    const users = require('./controllers/users')(db);
    const locations = require('./controllers/locations')(db);

    /*
     *  =========================================
     *  Routes for one controller
     *  =========================================
     */
    app.get('/', locations.renderHomepage);     
    app.get('/users/all', users.getAllUsers);
    app.get('/users/map', locations.renderMap);
    app.post('/users/login', users.login);
    app.post('/users/register', users.register);
    // app.get('/locations/all', locations.getAllLocations);
    app.get('/locations/:id', locations.getUsersLocations);
    app.post('/locations/add/:id', locations.add);
    app.delete('/locations/delete/:userid/:locationid', locations.deleteLocation);
};