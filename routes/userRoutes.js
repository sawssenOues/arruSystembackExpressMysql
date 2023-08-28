const express = require('express');
const authController = require('../modules/moduleUser/controllers/userController');



const router = express.Router();


// Route handling
router.use('/Admin', authController); 



module.exports = router
