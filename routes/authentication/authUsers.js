var express = require('express');
var router = express.Router();
var UserModule = require('../../db-modules/UserModule');

router.get('/getusers', function(req, res, next) {
  console.log('at get users')
 
  console.log(req.query)
  UserModule.getUserDetails(req.query,(err,users)=>{

    if(err){
      console.log('/getusers :error');
      res.status(500)
      res.send({err})
    }else{
      console.log('/getusers :sucess');
      res.status(200)
      res.send(users)

    }

  });
});

router.post('/saveuser', function(req, res, next) {
        console.log('at Save user')
        console.log(req.body)

        
        UserModule.saveuser(req.body,(err,user)=>{

          if(err){
            res.status(500)
            res.send({err})
          }else{
            console.log('/saveuser :sucess');
            console.log(user)
            res.status(200)
            res.send(user)
          }

        });
        
});

module.exports = router;