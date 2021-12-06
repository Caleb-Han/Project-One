const express = require('express');
const app = express();
const path = require('path');
const ToDoItems = require('./models/todoitems');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

const { urlencoded } = require('express');
const mongoDB = 'mongodb://127.0.0.1:27017/ToDoList'

app.use(express.urlencoded({ urlencoded: true }));
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(mongoDB)
    .then(() => console.log('connected'))
    .catch(err => console.log('not connected, err'))
    .finally(() => console.log('connection attempt made'));

app.set(path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/todolist', async (req,res) => {
    const toDoList = await ToDoItems.find({});
    res.render('todolist', { toDoList, displayDuration});
})

app.post('/todolist', async (req,res) => {
    const { toDoItem, jobRef} = req.body;
    const toDo = new ToDoItems({description: toDoItem, reference: jobRef});
    await toDo.save();
    res.redirect('/todolist');
})

app.put('/todolist/:id/edit', async (req,res) => {
    const { toDoItem, jobRef} = req.body;
    await ToDoItems.findByIdAndUpdate(req.params.id, {description: toDoItem, reference: jobRef});
    res.redirect('/todolist');
})

app.put('/todolist/:id/complete', async (req,res) => {
    const item = await ToDoItems.findById(req.params.id)
    
    if (item.status === true) {
        const endTime = new Date().getTime()/1000;
        let new_duration = item.duration + (endTime - item.startTime) 
        await ToDoItems.findByIdAndUpdate(req.params.id, {completed: true, status: false, duration: new_duration});
    } else {
        await ToDoItems.findByIdAndUpdate(req.params.id, {completed: true}); 
    }
    res.redirect('/todolist');
})

app.put('/todolist/:id/incomplete', async (req,res) => {
    await ToDoItems.findByIdAndUpdate(req.params.id, {completed: false});
    res.redirect('/todolist');
})

app.put('/todolist/:id/start', async (req,res) => {
    const startTime = new Date().getTime()/1000;
    const endTime = new Date().getTime()/1000; 
    const items = await ToDoItems.find({status: true})
    
    // Stops timer and updates duration of all other timers when start is pressed. 
    for (item of items) {
        let new_duration = item.duration + (endTime - item.startTime)
        console.log(item.duration, endTime - item.startTime)
        await ToDoItems.findByIdAndUpdate(item._id, {status: false, endTime: endTime, duration: new_duration})
   } 
   // Update the current item we started timing
   await ToDoItems.findByIdAndUpdate(req.params.id, {startTime: startTime, status: true});
    res.redirect('/todolist');
})

app.put('/todolist/:id/end', async (req,res) => {
    const endTime = new Date().getTime()/1000;
    const { startTime } = await ToDoItems.findById(req.params.id);
    let new_duration = endTime - startTime  
    let { duration } = await ToDoItems.findById(req.params.id) 
    if (duration) {
        new_duration = new_duration + duration; 
    }
    await ToDoItems.findByIdAndUpdate(req.params.id, {endTime: endTime, duration: new_duration, status: false});
    console.log('send end Time')
    res.redirect('/todolist');
})

app.put('/todolist/resetAll', async (req,res) => {
    await ToDoItems.updateMany({}, {startTime:0, endTime:0, duration: 0, status: false});
    res.redirect('/todolist');
})
app.put('/todolist/:id/reset', async (req,res) => {
    await ToDoItems.findByIdAndUpdate(req.params.id, {duration: 0, status: false});
    res.redirect('/todolist');
})

app.delete('/todolist/:id', async (req,res) => {
    await ToDoItems.findByIdAndDelete(req.params.id);
    res.redirect('/todolist')
})

app.get('/timesheet', (req, res) => {
    res.render('timesheet');
})

app.listen(3000, () => console.log('listening to Port 3000'))

function displayDuration(seconds) {
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds - hours * 3600)/60)
    let second = Math.floor(seconds - hours * 3600 - minutes * 60)
    return (`${hours}h ${minutes}m ${second}s`)
  }