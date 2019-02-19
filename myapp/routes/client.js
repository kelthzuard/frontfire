var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var phoneNumber = req.query.number;
  console.log(phoneNumber);
});

module.exports = router;