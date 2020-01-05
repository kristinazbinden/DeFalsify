// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const session = require('express-session');
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
 * Routes Definitions
 */
const topicsController = require('./controllers/topics.js')
app.use('/topics', topicsController)

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.status(200).send("I love shmaghetti")
})
/**
 * Server Activation
 */
app.listen(port, () => {
    console.log('Listening to requests on http://localhost:8000');
})
