//import express from "express";
//import cors from "cors";                                                  //Import generating unknown error.

const express = require("express");
const cors = require("cors");                                           

var txt = require('../data.json');
var refresh = require('../datarefresh.json');
// console.log(txt.details);

const app = express();
app.use(cors());
app.use(express.json());


app.get('/details', (req, res) => {
    res.send(JSON.stringify(refresh));
});

app.get('/details/:id', (req, res) => {
    // console.log(req.params.id);
   let id = req.params.id;
    // console.log(txt.details);
    for (let i of txt.details) {
        console.log(i);
        if (i.id === id) {
            res.send(JSON.stringify(i));
        }
    }
});

/* app.post('/details', (req, res) => {                                                             //will be used later for adding new entries.
    console.log(req.body)
    
}); */

app.patch('/details/:id', (req, res) => {
    let id = req.params.id;
    //console.log(id)
    //console.log(txt)
    for (let i of txt.details) {
        if (i.id === id) {
            i.firstName = req.body.firstName;
            i.lastName = req.body.lastName;
            i.middleName = req.body.middleName;
            i.email = req.body.email;
            i.phone = req.body.phone;
            i.role = req.body.role;
            i.address = req.body.address;
        }        
    }
    res.send(JSON.stringify(txt));
});

app.delete('/details/:id', (req, res) => {
    let id = Number(req.params.id) -1;    
    txt.details[id] = [];
    res.send(JSON.stringify(txt));
});

var port = process.env.PORT || 3000;
app.listen(port);