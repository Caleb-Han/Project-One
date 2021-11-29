const express = require('express');
const app = express();
const path = require('path')
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
    res.render('todolist', { toDoList});
})

app.post('/todolist', async (req,res) => {
    const { toDoItem, jobRef} = req.body;
    const toDo = new ToDoItems({description: toDoItem, reference: jobRef});
    await toDo.save();
    res.redirect('/todolist');
})

app.delete('/todolist/:id', async (req,res) => {
    await ToDoItems.findByIdAndDelete(req.params.id);
    res.redirect('/todolist')
})

app.put('/todolist/:id', async (req,res) => {
    const { toDoItem, jobRef} = req.body;
    await ToDoItems.findByIdAndUpdate(req.params.id, {description: toDoItem, reference: jobRef});
    res.redirect('/todolist');
})

app.get('/timesheet', (req, res) => {
    res.render('timesheet');
})

app.listen(3000, () => console.log('listening to Port 3000'))

