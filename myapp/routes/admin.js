var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var model = require('../common/model');


router.get('/', function(req, res, next) {
  res.send('adminget');
});

router.post('/', function(req, res, next) {
  console.log(req.body.data);
  var content = req.body.data.phoneNumber;
  var md5 = crypto.createHash('md5');
  md5.update(content);
  var secretNum = md5.digest('hex');
  var phone = model.phone;
  phone.create({
      phoneNumber:req.body.data.phoneNumber,
      secretNumber:secretNum,
      desc: req.body.data.desc
  },function(err,doc){
      if(err){
          res.sendStatus(500);
      }else{
          res.status(200).send('success');
      }
  });
});


module.exports = router;
