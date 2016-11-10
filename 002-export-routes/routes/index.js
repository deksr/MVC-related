var express = require('express');
var router = express.Router();
var functionRoutes = require('../own-modules/route-functions');



router.get('/', functionRoutes.userDetails);
// router.post('/', functionRoutes.userDetails);
router.post('/search', functionRoutes.search);

module.exports = router;
