const mongoose = require('mongoose')

const planningSchema = new mongoose.Schema({
    procedure:{type: String, required: true},
    description:{type: String, required: true},
    file:{type: Object},
    createAt:{type: Date, default:Date.now()},
    pacienteName:{type: String, required: true},
    age:{type: Number, required: true},
    invocator:{type: String, required: true},
    status:{type: String, default: 'open'}
})

module.exports = mongoose.model("Planning", planningSchema)