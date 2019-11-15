const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
var co = require('co')
var path = require('path')
var Promise = require('bluebird');
var birds = require('./birds')
module.exports = function () {
    var app = express();
    // const app = express();
    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }));
    // app.use(bodyParser.json())
    app.use(express.static('public'))
    // app.use(express.static(path.join(__dirname, 'public')))
    // app.use('/static', express.static(path.join(__dirname, 'public')));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(cors());
    app.use('/birdss', birds);
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', "Content-Type");
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    });
    app.post('/api/loadData', async function (req, res) {
        try {
            console.log("from post", req.body)
            // var sampleArr = req.body.data
            var objKey = Object.keys(req.body)[0];
            var sampleArr = req.body[objKey]
            var i = 0;
            console.log("working");
            console.time("time achieved")
            sampleArr.forEach(obj => {                
                obj.id = i++;
            })
            console.timeEnd("time achieved")
            res.sendFile(path.join(__dirname, 'public', 'download.jpg'))
            // res.sendFile('public/download.jpg' , { root : __dirname});              
            // res.send(sampleArr)
        } catch (err) {
            console.log("catch err", err)
        }
    })
    // app.get('/', () => {
    //     console.log("get is invoked");
    // });
    app.route('/jagan')
        .get(function (req, res) {
            console.log('<h1>Node Application</h1>: ');
            res.send('<h1>Node Application</h1>')
        })
        .post(function (req, res) {
            res.send('Add a book')
        });
        app.get('/',(req,res)=>{
            res.send("hi jagan")
        })
    app.listen( process.env.port , () => {
        console.log(1234);
        
    });
}