var express = require('express');
var router = express.Router();


router.get('/getusers', function(req, res, next) {
  res.render('index', { title: 'Node' });
});

router.post('/saveuser', function(req, res, next) {
console.log('at Save user')
console.log(req.body.user)
});

module.exports = router;