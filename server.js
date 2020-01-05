
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
 * Routes Definitions
 */
// app.get("/", (req, res) => {
//     res.status(200).send("I love shmaghetti")
// })
/**
 * Server Activation
 */
app.listen(port, () => {
    console.log('Listening to requests on http://localhost:8000');
})
