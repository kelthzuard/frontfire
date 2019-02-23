var express = require('express');
var router = express.Router();
var model = require('../common/model');

router.post('/', function(req, res, next) {
  var user = model.user;
  console.log(req.body)
  user.findOne({
    userName: req.body.userName,
    userPassword: req.body.userPassword
  }, function(err, doc) {
    if (!doc) {
      res.status(404).send('not correct');
    }else {
      req.session.islog = 1;
      console.log(req.session);
      res.status(200).send('success login');
    }
  })
});

module.exports = router;