const express = require('express');
const app= express();
const path = require('path');
const mongoose = require('mongoose');
const Property = require('./models/property.js');
const User = require('./models/user.js');
const { render } = require('ejs');


//Connecting our database
const uri = "mongodb+srv://shubh99:Shubh%401998@cryproperty.zypeh.mongodb.net/Cryproperty";
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "DB Connection Error"));
db.on('open', ()=>{
    console.log("Database Connected");
})
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));

//Defining APIs
app.get('/', (req,res)=> {
    res.render('landing.ejs')
})

app.get('/user/loginpage', (req,res)=> {
    res.render('auth/login.ejs')
})

app.get('/user/registerpage', (req,res)=> {
    res.render('auth/register.ejs')
})

app.get('/user/login', (req,res)=> {
    res.render('login.ejs')
})

app.post('/user/register', async(req,res)=> {
    const user = new User(req.body.user);
    await user.save();
    res.redirect('/listProperties')
})

app.get('/property/new', async(req, res)=>{
    res.render('properties/create');
})

app.post('/property', async(req, res)=>{
    const property = new Property(req.body.property)
    await property.save();
    res.redirect(`/property/${property._id}`)
})

app.get('/listProperties', async (req,res)=>{
    const properties = await Property.find({});
    res.render("properties/index.ejs", {properties})
})

app.get('/property/:id', async(req,res)=>{
    const property = await Property.findById(req.params.id);
    res.render("properties/show.ejs", {property})
})

app.listen(3000,()=>{
    console.log('Serving on port 3000')
})