const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const formRoute = require('./routes/Form')
const app = express();

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));


//Build Access


app.use(express.static(path.join(__dirname, 'build')));



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Content-Length,Host');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Routes
app.use('/', formRoute);


app.get('/', (req, res) => {
    res.status(200).json({
        "Tutorial": "Node Api For Form"
    })
})

//Error handler

app.use((err, req, res, next) => {
    console.log(err);
    if (err && err.status && err.status == 404) {
        return res.json({
            statusCode: 200,
            error: 'API not found',
            response: null
        });
    }
    else if (err && err.status && err.status == 400) {
        let errormessage = err.errors[0].messages;
        errormessage = errormessage.toString().replace(/\"/g, '');

        return res.json({
            statusCode: 200,
            error: errormessage,
            response: null
        });
    }
    else if (err) {
        return res.json({
            statusCode: 200,
            error: err,
            response: null
        });
    }
    else {
        res.status(500).json({ message: "Something looks wrong :( !!!" });
    }

});



app.use('*', (req, res, next) => {
    res.status(404).json({
        status: 404,
        message: 'Page Not Found',
        data: null
    });
})

// server  mongodb+srv://zabi:<password>@cluster0-pg5tj.mongodb.net/test?retryWrites=true&w=majority
// local   mongodb://127.0.0.1:27017/formApi
mongoose.connect('mongodb+srv://zabi:zabi123@cluster0-pg5tj.mongodb.net/test?retryWrites=true&w=majority', { useFindAndModify: false })
    .then(result => {
        app.listen(5000, () => {
            console.log("Node Server is Running");
        });
    })
    .catch(err => {
        console.log(err);
    })



