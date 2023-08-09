
const express = require('express')
const router = express.Router()

const { getgouvernoratById } = require('../services/gouvernoratServices')
const communeService = require('../services/communeServices')
const { schema_validation, validateDbId } = require('../../../middleware/index');
const { commune_validation } = require('../validation/moduleValidation');


router.get('/:id/communes', validateDbId('id'), async (req, res, next) => { //tous
    const gouvernoratId = req.params.id;
    const existinggouvernorat = await getgouvernoratById(gouvernoratId);
    if (!existinggouvernorat) {
        return res.status(404).json('No record with thee given gouvernorat_id: ' + gouvernoratId);
    }
    getgouvernoratById(gouvernoratId).then(() => communeService.getAllcommuneBygouvernoratRelated(gouvernoratId))
        .then((data) => res.status(201).json(data))
        .catch((err) => next(err));

})

router.post('/:id/communes/ajoutcommune', validateDbId('id'), async (req, res, next) => {

    const { nom , gouvernorat_id } = req.body;
        // Next, validate the request body using the schema_validation middleware
        // with the commune_validation schema
        schema_validation(commune_validation)(req, res, async (error) => {
            if (error) {
                // If there is a validation error, return a response with the validation details
                return res.status(400).json({ error: error.message });
            } else {
                // If validation is successful, proceed with creating the commune
                try {
                    // Check if the `gouvernorat_id` is valid by verifying it using getgouvernoratById function
                    const existinggouvernorat = await getgouvernoratById(gouvernorat_id);
                    if (!existinggouvernorat) {
                        return res.status(404).json('No record with thee given gouvernorat_id: ' + gouvernorat_id);
                    }

                    // If the `gouvernorat_id` is valid, proceed with creating the commune
                    const data = await communeService.createcommune(nom , gouvernorat_id);
                    return res.status(201).send('created successfully.')
                } catch (err) {
                    // If communeService.createcommune throws an error, handle it
                    // This includes handling the foreign key constraint failure
                    return next(err);
                }
            }
        });
   
});

router.get('/:id/communes/:idr', validateDbId('id'), validateDbId('idr'), async(req, res, next) => {
    const gouvernoratId = req.params.id;
    const existinggouvernorat = await getgouvernoratById(gouvernoratId);
    if (!existinggouvernorat) {
        return res.status(404).json('No record with thee given gouvernorat_id: ' + gouvernoratId);
    }
    getgouvernoratById(gouvernoratId).then(() => communeService.getcommuneById(req.params.idr))
        .then(data => {
            if (data) res.send(data)
            else res.status(404).json('no record with given id : ' + req.params.idr)
        })
        .catch(err => next(err))
})


router.put('/:id/communes/update/:idr', validateDbId('id'), validateDbId('idr'), schema_validation(commune_validation), async(req, res, next) => {
    const { nom, gouvernorat_id } = req.body;
  
     communeService.updatecommuneById(nom,gouvernorat_id , req.params.idr)
        .then(data => {
            if (data) res.send(data)
            else res.status(404).json('no record with given id : ' + req.params.idr)
        })
        .catch(err => next(err))
})

router.delete('/:id/communes/delete/:idr', validateDbId('id'), validateDbId('idr'), async(req, res) => {
    
    communeService.deletecommune(req.params.idr)
        .then(data => {
            if (data) {res.send(data)}
            else{ res.status(404).json('no record with given id : ' + req.params.idr)}
        })
        .catch(err => next(err))
})

module.exports = router