
const express = require('express')
const router = express.Router()

const { getDomaineById } = require('../services/domaineServices')
const risqueService = require('../services/risqueServices')
const { schema_validation, validateDbId } = require('../../../middleware/index');
const { risque_validation } = require('../validation/moduleValidation');


router.get('/:id/Risques', validateDbId('id'), async (req, res, next) => { //tous
    const domaineId = req.params.id;
    const existingDomaine = await getDomaineById(domaineId);
    if (!existingDomaine) {
        return res.status(404).json('No record with thee given domaine_id: ' + domaineId);
    }
    getDomaineById(domaineId).then(() => risqueService.getAllRisqueBydomaineRelated(domaineId))
        .then((data) => res.status(201).json(data))
        .catch((err) => next(err));

})

router.post('/:id/Risques/ajoutRisque', validateDbId('id'), async (req, res, next) => {

    const { titre, description, domaine_id } = req.body;
        // Next, validate the request body using the schema_validation middleware
        // with the risque_validation schema
        schema_validation(risque_validation)(req, res, async (error) => {
            if (error) {
                // If there is a validation error, return a response with the validation details
                return res.status(400).json({ error: error.message });
            } else {
                // If validation is successful, proceed with creating the risque
                try {
                    // Check if the `domaine_id` is valid by verifying it using getDomaineById function
                    const existingDomaine = await getDomaineById(domaine_id);
                    if (!existingDomaine) {
                        return res.status(404).json('No record with thee given domaine_id: ' + domaine_id);
                    }

                    // If the `domaine_id` is valid, proceed with creating the risque
                    const data = await risqueService.createRisque(titre, description, domaine_id);
                    return res.status(201).send('created successfully.')
                } catch (err) {
                    // If risqueService.createRisque throws an error, handle it
                    // This includes handling the foreign key constraint failure
                    return next(err);
                }
            }
        });
   
});

router.get('/:id/Risques/:idr', validateDbId('id'), validateDbId('idr'), async(req, res, next) => {
    const domaineId = req.params.id;
    const existingDomaine = await getDomaineById(domaineId);
    if (!existingDomaine) {
        return res.status(404).json('No record with thee given domaine_id: ' + domaineId);
    }
    getDomaineById(domaineId).then(() => risqueService.getrisqueById(req.params.idr))
        .then(data => {
            if (data) res.send(data)
            else res.status(404).json('no record with given id : ' + req.params.idr)
        })
        .catch(err => next(err))
})


router.put('/:id/Risques/update/:idr', validateDbId('id'), validateDbId('idr'), schema_validation(risque_validation), async(req, res, next) => {
    const { titre, description, domaine_id } = req.body;
  
     risqueService.updaterisqueById(titre, description ,domaine_id , req.params.idr)
        .then(data => {
            if (data) res.send(data)
            else res.status(404).json('no record with given id : ' + req.params.idr)
        })
        .catch(err => next(err))
})

router.delete('/:id/Risques/delete/:idr', validateDbId('id'), validateDbId('idr'), async(req, res) => {
    
    risqueService.deleterisque(req.params.idr)
        .then(data => {
            if (data) {res.send(data)}
            else{ res.status(404).json('no record with given id : ' + req.params.idr)}
        })
        .catch(err => next(err))
})

module.exports = router