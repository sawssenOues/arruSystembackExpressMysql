
const express = require('express');
const gouvernoratController = require('../modules/moduleAdresse/controllers/gouvernoratController');
const communeController = require('../modules/moduleAdresse/controllers/communeController');
const cartierController = require('../modules/moduleAdresse/controllers/cartierController');
const router = express.Router();


// Route handling

router.use('/Adresses', gouvernoratController);
router.use('/Adresses', communeController);
router.use('/Adresses', cartierController);
module.exports = router
