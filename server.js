
/**
 * Required External Modules
 */
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
const googleTrends = require('google-trends-api');
const db = mongoose.connection;
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
/**
 *  App Configuration
 */
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret:'feedmeseymour',
    resave:false,
    saveUninitialized:false
}))
/**
 *  Database
 */
const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useMongoClient: true
});

mongoose.connection.once('open', function(){
         console.log('Conection has been made!');
             }).on('error', function(error){
          console.log('Error is: ', error);
});


db.on('error', (error) => console.log(error.message + ' problem with Mongod?'));

db.on('connected', () => console.log('mongo connected: '));

db.on('disconnected', () => console.log('mongo disconnected'));

/**
 * Routes Definitions
 */
const topicsController = require('./controllers/topics.js')
app.use('/topics', topicsController)

app.use(morgan('tiny'));

const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const sessionController = require('./controllers/session.js')
app.use('/session', sessionController)

/**
 * Create MemoryStore constructor
 */
const MemoryStore = require('memorystore')(session);
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    secret: 'feedmeseymour',
    saveUninitialized: false
}))

/**
 * Routes Definitions
 */
 // app.get('/topics',async(req,res)=>{
 //     res.header("Access-Control-Allow-Origin", "*");
 //     const user=await factcheck();
 //     res.send(user);
 // })


 /**
 * On all requests add headers
 */
app.all('*', function(req, res,next) {


    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});
/**
 * Server Activation
 */
app.listen(port, () => {
    console.log('Listening to requests on http://localhost:8000');
})
