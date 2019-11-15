var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', new Date().toLocaleString().replace(/[^a-zA-Z0-9]/g, "_"))
    next()
})
// define the home page route
router.get('/', function (req, res) {
    console.log('Birds home page: ');

    res.send('Birds home page')
})
// define the about route
router.post('/about', function (req, res) {
    console.log('Birds home page: ');

    res.send('About birds')
})

module.exports = router