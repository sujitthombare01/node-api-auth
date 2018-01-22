var express = require('express');
var router = express.Router();
var UserModule = require('../../db-modules/UserModule');

router.get('/getusers', function(req, res, next) {
  console.log('at get usersss##########################')
  next();
});

router.post('/saveuser', function(req, res, next) {
        console.log('at Save user')
   

        
        UserModule.saveuser(req.body.user,(err,user)=>{

          if(err){
            console.log('/saveuser :error');
            console.log(err)
          }else{
            console.log('/saveuser :sucess');
            console.log(user)

          }

        });
        
});

module.exports = router;