var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sarvesh');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.post('/sign_up', function(req,res){
    var User = req.body.user;
    var Email = req.body.email;
    var Phoneno = req.body.phoneno;
    var Project = req.body.project;
    var Address = req.body.address;
    var data = {
        "user": User,
        "email":Email,
        "phoneno":Phoneno,
        "project":Project,
        "address":Address,
    }
db.collection('Orders').insertOne(data,function+(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");      
    });
     return res.redirect('Success.html');
})  
app.listen(8000);
console.log("server listening at port 8000");
