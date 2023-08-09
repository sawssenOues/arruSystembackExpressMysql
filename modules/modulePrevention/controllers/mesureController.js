
const express = require('express')
const router = express.Router()

const { getrisqueById } = require('../services/risqueServices')
const mesureService = require('../services/mesureServices')
const { schema_validation, validateDbId } = require('../../../middleware/index');
const { mesure_validation } = require('../validation/moduleValidation');


router.get('/:id/Mesures', validateDbId('id'), async (req, res, next) => { //tous
    const risqueId = req.params.id;
    const existingrisque = await getrisqueById(risqueId);
    if (!existingrisque) {
        return res.status(404).json('No record with thee given risque_id: ' + risqueId);
    }
    mesureService.getAllMesuresByrisqueRelated(risqueId)
        .then((data) => res.status(201).json(data))
        .catch((err) => next(err));

})

router.post('/:id/Mesures/ajoutMesure', validateDbId('id'), async (req, res, next) => {

    const { titre, description, risque_id } = req.body;

        schema_validation(mesure_validation)(req, res, async (error) => {
            if (error) {
  
                return res.status(400).json({ error: error.message });
            } else {
                try {
                    const existingrisque = await getrisqueById(risque_id);
                    if (!existingrisque) {
                        return res.status(404).json('No record with thee given risque_id: ' + risque_id);
                    }

                    const data = await mesureService.createMesure(titre, description, risque_id);
                    return res.status(201).send('created successfully.')
                } catch (err) {
                   
                    return next(err);
                }
            }
        });
   
});

router.get('/:id/Mesures/:idr', validateDbId('id'), validateDbId('idr'), async(req, res, next) => {
    const risqueId = req.params.id;
    const existingrisque = await getrisqueById(risqueId);
    if (!existingrisque) {
        return res.status(404).json('No record with thee given risque_id: ' + risqueId);
    }
    getrisqueById(risqueId).then(() => mesureService.getmesureById(req.params.idr))
        .then(data => {
            if (data) res.send(data)
            else res.status(404).json('no record with given id : ' + req.params.idr)
        })
        .catch(err => next(err))
})


router.put('/:id/Mesures/update/:idr', validateDbId('id'), validateDbId('idr'), schema_validation(mesure_validation), async(req, res, next) => {
    const { titre, description, risque_id } = req.body;
  
     mesureService.updatemesureById(titre, description ,risque_id , req.params.idr)
        .then(data => {
            if (data) res.send(data)
            else res.status(404).json('no record with given id : ' + req.params.idr)
        })
        .catch(err => next(err))
})

router.delete('/:id/Mesures/delete/:idr', validateDbId('id'), validateDbId('idr'), async(req, res) => {
    
    mesureService.deletemesure(req.params.idr)
        .then(data => {
            if (data) {res.send(data)}
            else{ res.status(404).json('no record with given id : ' + req.params.idr)}
        })
        .catch(err => next(err))
})

module.exports = router