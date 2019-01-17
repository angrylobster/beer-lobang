const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const db = require('./db');

// Init express app
const app = express();

// Set up middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public/'));

// app.use((req, res, next) => {
//     // if cookie
    
//         req.cookies['loggedIn'] ? console.log(true) : res.render('map');
//         next();
//     // else
//         // 
// })


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

 require('./routes')(app, db);

 /**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function () {
    server.close(() => {
        console.log('Process terminated')
        db.pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);