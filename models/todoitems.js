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
        type: Number
    },
    endTime: {
        type: Number
    },
    duration: {
        type: Number,
        default: 0
        },
    status: {
        type: Boolean,
        default: false
        },
    completed: {
        type: Boolean,
        default: false
    }

})


function displayDuration(seconds) {
    const dict = {}
    dict[hours] = Math.floor(seconds / 3600)
    dict[minutes] = Math.floor((seconds - dict[hours] * 3600)/60)
    return (`${dict[hours]}:${dict[minutes]}`)
  }

const ToDo = mongoose.model('ToDo', ToDoSchema);
module.exports = ToDo;