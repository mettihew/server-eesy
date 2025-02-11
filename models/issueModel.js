const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
    issue: {type: String, required: true},
    pId: {type: String, required: true}
})

module.exports = mongoose.model('Issue', issueSchema )
