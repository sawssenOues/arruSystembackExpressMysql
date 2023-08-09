
const express = require('express')
const router = express.Router()

const { getcommuneById } = require('../services/communeServices')
const cartierService = require('../services/cartierServices')
const { schema_validation, validateDbId } = require('../../../middleware/index');
const { cartier_validation } = require('../validation/moduleValidation');


router.get('/:id/cartiers', validateDbId('id'), async (req, res, next) => { //tous
    const communeId = req.params.id;
    const existingcommune = await getcommuneById(communeId);
    if (!existingcommune) {
        return res.status(404).json('No record with thee given commune_id: ' + communeId);
    }
    getcommuneById(communeId).then(() => cartierService.getAllcartierBycommuneRelated(communeId))
        .then((data) => res.status(201).json(data))
        .catch((err) => next(err));

})

router.post('/:id/cartiers/ajoutcartier', validateDbId('id'), async (req, res, next) => {

    const { nom , commune_id } = req.body;
        // Next, validate the request body using the schema_validation middleware
        // with the cartier_validation schema
        schema_validation(cartier_validation)(req, res, async (error) => {
            if (error) {
                // If there is a validation error, return a response with the validation details
                return res.status(400).json({ error: error.message });
            } else {
                // If validation is successful, proceed with creating the cartier
                try {
                    // Check if the `commune_id` is valid by verifying it using getcommuneById function
                    const existingcommune = await getcommuneById(commune_id);
                    if (!existingcommune) {
                        return res.status(404).json('No record with thee given commune_id: ' + commune_id);
                    }

                    // If the `commune_id` is valid, proceed with creating the cartier
                    const data = await cartierService.createcartier(nom , commune_id);
                    return res.status(201).send('created successfully.')
                } catch (err) {
                    // If cartierService.createcartier throws an error, handle it
                    // This includes handling the foreign key constraint failure
                    return next(err);
                }
            }
        });
   
});

router.get('/:id/cartiers/:idr', validateDbId('id'), validateDbId('idr'), async(req, res, next) => {
    const communeId = req.params.id;
    const existingcommune = await getcommuneById(communeId);
    if (!existingcommune) {
        return res.status(404).json('No record with thee given commune_id: ' + communeId);
    }
    getcommuneById(communeId).then(() => cartierService.getcartierById(req.params.idr))
        .then(data => {
            if (data) res.send(data)
            else res.status(404).json('no record with given id : ' + req.params.idr)
        })
        .catch(err => next(err))
})


router.put('/:id/cartiers/update/:idr', validateDbId('id'), validateDbId('idr'), schema_validation(cartier_validation), async(req, res, next) => {
    const { nom, commune_id } = req.body;
  
     cartierService.updatecartierById(nom,commune_id , req.params.idr)
        .then(data => {
            if (data) res.send(data)
            else res.status(404).json('no record with given id : ' + req.params.idr)
        })
        .catch(err => next(err))
})

router.delete('/:id/cartiers/delete/:idr', validateDbId('id'), validateDbId('idr'), async(req, res) => {
    
    cartierService.deletecartier(req.params.idr)
        .then(data => {
            if (data) {res.send(data)}
            else{ res.status(404).json('no record with given id : ' + req.params.idr)}
        })
        .catch(err => next(err))
})

module.exports = router