const express = require('express');
const router = express.Router();
const Topics = require('../models/topics.js');

const User = require('../models/users.js');



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
