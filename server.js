const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const config = require('./backend/config/config')
const dbconnectLib = require('./backend/lib/dbConnect')
var users = require('./backend/models/userModel')

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname+"/frontend"))

var cookieParser = require("cookie-parser")
var session = require("express-session")
const MongoStore = require('connect-mongo')


dbconnectLib.connect()

app.use(session({
    secret: "this is secret!!!!",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_CONNECTION_STRING })

}))



const PORT = process.env.PORT || 3000;


app.use(cookieParser());
app.post('/api/login', function(req, res) {
    users.find(req.body, function(err, data) {
        if (err) { res.status(400).json({ msg: "Failed" }); } else if (data.length == 1) {
            req.session.userid = data[0]._id
            req.session.username = data[0].username
            console.log(req.session)
            res.redirect("/home");

        } else {

            res.redirect("/login");

        }
    });
})


var isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userid)
        next();
    else
        return res.redirect("/login");
}


var isNotAuthenticated = (req, res, next) => {
    if (!req.session || !req.session.userid)
        next();
    else
        return res.redirect("/");
}

app.get("/home", isAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/frontend/html/home.html")
})

app.get("/getdetails", isAuthenticated, (req, res) => {
    res.json({
        username: req.session.username
    });
})

app.get("/api/logout", isAuthenticated, (req, res) => {
    req.session.destroy(err => {
        if (err)
            return res.status(404).json({
                err: "error"
            })
    })

    return res.status(200).json({
        message: "succcessful signout"
    })

})


app.post('/api/register', function(req, res) {
    users.find({ email: req.body.email }, function(err, data) {
        if (err) { res.status(400).json({ msg: "Failed" }); } else { //console.log(data);
            if (data.length > 0)
                res.status(200).json({ msg: "Saved Successful", result: data });
            else {

                var add = new users(req.body);
                add.save(function(err, record) {
                    if (err) {
                        res.redirect("/register");
                    } else {
                        res.redirect("/login");
                    }
                });
            }
        }
    });
})


app.get("/", function(req, res){
    let i = __dirname + "/frontend/html/home.html";
    res.sendFile(i);
});

app.get("/login", function(req, res){
    let i = __dirname + "/frontend/html/login.html";
    res.sendFile(i);
});

app.get("/register", function(req, res){
    let i = __dirname + "/frontend/html/register.html";
    res.sendFile(i);
});

app.get("/package1", function(req, res){
    let i = __dirname + "/frontend/html/package1.html";
    res.sendFile(i);
});
 
app.listen(PORT, function(){
    console.log("Server Starting running on http://localhost:"+PORT);
});

