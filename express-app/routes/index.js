var express = require('express');
var router = express.Router();

const fs = require('fs')
const path = require('path')
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log('-----------');
  res.render('index', { title: 'Just App' });
});

module.exports = router;
