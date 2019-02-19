var express = require('express');
var router = express.Router();
var crypto = require('crypto');


router.get('/', function(req, res, next) {
  res.send('adminget');
});

router.post('/', function(req, res, next) {
  console.log(req.body.data);
  var content = req.body.data.phoneNumber;
  var md5 = crypto.createHash('md5');
  md5.update(content);
  var secretNum = md5.digest('hex');
  console.log("加密的结果："+secretNum);
  res.status(200).send('ok');
});


module.exports = router;
