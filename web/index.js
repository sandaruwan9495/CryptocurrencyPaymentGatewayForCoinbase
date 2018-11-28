'use strict'
// required dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
// setup the env variables
const dotenv = require('dotenv');
dotenv.config();
// db

const db = require('../controllers/dbconection.controller');

// routers
const routes = require('./router/index.route');

// express app
const server = require('./server')

// registering the https certificates
const httpsOption = {
    cert: fs.readFileSync(path.join(__dirname, '../', 'SSL_Certificate', 'server.crt')),
    key: fs.readFileSync(path.join(__dirname, '../', 'SSL_Certificate', 'server.key'))
}

// setup the jade view engine
server.use(express.static(path.join(__dirname, '../')));
server.set('views', path.join(__dirname, '../') + '/views');
server.set('view engine', 'jade')

const app = module.exports = {};

app.runServer = function (args) {
    // routes
    server.use('/', routes.accountRoutes);
    server.use('/auth', routes.authRoutes);
    //Connect to the database
    db.conn.connect()
        .then(
            () => {
                console.log("Connected to database")

                // start the server
                https.createServer(httpsOption, server).listen(process.env.NODE_PORT || 3000, (err) => {
                    if (err) {
                        console.log('Server goes down due to ' + err)
                    } else {
                        console.log('Server running on ' + process.env.NODE_PORT || 3000)
                    }
                });
            }
        )
        .catch(
            (err) => {
                console.log("Erros In database connection so server will not be start")
                console.log("Error: ", err)
            }
        );
}