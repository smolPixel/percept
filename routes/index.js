const express = require('express');
const auth = require('feathers-authentication');
const path = require('path');
var router = express.Router();

// 

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/index.html'));
});





module.exports = router;