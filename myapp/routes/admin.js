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
      desc: req.body.data.desc,
      location: 'unknow'
  },function(err,doc){
      if(err){
          res.sendStatus(500);
      }else{
        console.log(doc);
          res.status(200).send('success');
      }
  });
});

router.get('/getList', function(req, res ,next) {
  console.log(req.session)
  if (req.session.islog != 1) {
    res.status(200).send('notLogin');
  }else {
    var phone = model.phone;
    phone.find({},function(err,doc){
      if (err) {
        res.sendStatus(404);
      }else {
        res.status(200).send(doc);
      }
    });
  }
});


module.exports = router;
