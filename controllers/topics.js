const express = require('express');
const router = express.Router();
const Topic = require('../models/topics.js');
const User = require('../models/users.js');
const axios = require('axios');
require("dotenv").config();

router.get("/facts", (req, res) => {
    axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?key=${process.env.GOOGLE_API_KEY}&query=${req.query.search}`)
        .then(response => {
        res.json(response.data)
    })
})

router.get("/", (re, res) => {
    Topics.find({}, (error, foundTopics) => {
        res.json(foundTopics)
    })
});

router.post("/", (req, res) => {
    Topics.create(req.body, (error, createTopic) => {
        res.json(createdTopic)
    })
});

router.delete("/:id", (req, res) => {
    Topics.findByIdAndDelete(req.params.id, (error, deletedTopic) => {
        res.json(deletedTopic)
    })
});

router.put("/:id", (req, res) => {
    Topics.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updateTopic) => {
        res.json(updatedTopic)
    })
});

module.exports = router;
