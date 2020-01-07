const mongoose = require('mongoose');



const topicSchema = new mongoose.Schema({
    text: { type: String, required:true },
    claimant: String,
    source: String,
    title: String,
    rating: String,
    notes: String,
    userId: String
})

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
