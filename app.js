const express =require('express');
const path = require('path');
const mongoose =require('mongoose');
const Property= require('./models/Property')
mongoose.connect("mongodb+srv://shubh99:Shubh%401998@cryproperty.zypeh.mongodb.net/Cryproperty");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});

const app= express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=> {
    res.redirect('/Properties')
})

app.get('/Properties', async(req,res)=> {
   const property= await Property.find({});
   res.render('properties/index',{property})
})

app.get('/Properties/new', async (req,res)=> {
    res.render('properties/new')
 })

 app.post('/Properties1', async (req,res)=> {
    const property = new Property(req.body.Array)
    await property.save();
    res.redirect(`/Properties/${property._id}`)
 })

app.get('/Properties/:id', async(req,res)=> {
    const property= await Property.findById(req.params.id);
    res.render('properties/show', {property})
 })

app.listen(3000,()=>{
    console.log('Serving on port 3000')
})