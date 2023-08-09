
 const express = require('express');
 const domaineController = require('../modules/modulePrevention/controllers/domaineController');
 const risqueController = require('../modules/modulePrevention/controllers/risqueController');
 const mesureController = require('../modules/modulePrevention/controllers/mesureController');


const router = express.Router();


// Route handling
router.use('/Admin', domaineController); // final route is /Domaines+ "controller suffix" exp /Domaines/for get tous controller
router.use('/Admin/Domaines', risqueController); // final route is /Risques+ "controller suffix" exp /Risques/for get tous controller
router.use('/Admin/Risques', mesureController); // final route is /Mesures+ "controller suffix" exp /Mesures/for get tous controller



module.exports = router
