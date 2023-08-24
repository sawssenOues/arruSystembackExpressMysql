
 const express = require('express');
 const authController = require('../modules/auth/controllers/authController');



const router = express.Router();


// Route handling
router.use('/Admin', authController); 



module.exports = router
