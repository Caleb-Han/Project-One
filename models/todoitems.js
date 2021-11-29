const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
    reference: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Date
        }
})

const ToDo = mongoose.model('ToDo', ToDoSchema);
module.exports = ToDo;