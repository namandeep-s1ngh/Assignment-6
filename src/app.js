//import express from "express";
//import cors from "cors";                                                  //Import generating unknown error.
var express = require("express");
var cors = require("cors");
var txt = require('../data.json');
var refresh = require('../datarefresh.json');
// console.log(txt.details);
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
//app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/details', function (req, res) {
    res.send(JSON.stringify(refresh));
});
app.get('/details/:id', function (req, res) {
    // console.log(req.params.id);
    var id = req.params.id;
    // console.log(txt.details);
    for (var _i = 0, _a = txt.details; _i < _a.length; _i++) {
        var i = _a[_i];
        console.log(i);
        if (i.id === id) {
            res.send(JSON.stringify(i));
        }
    }
});
/* app.post('/details', (req, res) => {                                                             //will be used later for adding new entries.
    console.log(req.body)
    
}) */
app.patch('/details/:id', function (req, res) {
    // console.log(req.body)
    var id = req.params.id;
    //console.log(id)
    //console.log(txt)
    for (var _i = 0, _a = txt.details; _i < _a.length; _i++) {
        var i = _a[_i];
        // console.log(txt)
        if (i.id === id) {
            i.firstName = req.body.firstname;
            i.lastName = req.body.lastname;
            i.middleName = req.body.middlename;
            i.email = req.body.email;
            i.phone = req.body.phone;
            i.role = req.body.role;
            i.address = req.body.address;
        }
    }
    // console.log(txt)
    res.send(JSON.stringify(txt));
});
app["delete"]('/details/:id', function (req, res) {
    var id = Number(req.params.id) - 1;
    txt.details[id] = [];
    res.send(JSON.stringify(txt));
});
var port = process.env.PORT || 3000;
app.listen(port);
