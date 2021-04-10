const mongoose = require('mongoose');
const schema = mongoose.Schema;
// Schema define structure

const candidate = new schema({
    'name of the candidate': {
        type: String,
        required: true,
    },
    'email': {
        type: String,
        required: true,
    },
    'mobile': {
        type: String,
    },
    'date of birth': {
        type: Date,
    },
    'work experience': {
        type: String,
    },
    'resume title': {
        type: String,
    },
    'current location': {
        type: String,
    },
    'postal address': {
        type: String,
    },
    "current employer": {
        type: String,
    },
    "current designation": {
        type: String,
    },
}, { timestamp: true })

module.exports = mongoose.model('candidate', candidate);