 const express = require('express')
 const router = express.Router()

 const domaineService = require('../services/domaineServices')
 const {schema_validation,validateDbId } = require('../../../middleware/index');
 const {domaine_validation} = require('../validation/moduleValidation');

router.get('/Domaines', async (req, res) => {
    const domaines = await domaineService.getAlldomaines()
    res.send(domaines)
})

router.get('/Domaines/:id',validateDbId('id') , async (req, res) => {
    const domaine = await domaineService.getDomaineById(req.params.id)
    if (domaine == undefined)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send(domaine)
})

router.delete('/Domaines/delete/:id',validateDbId('id') , async (req, res) => {
    const affectedRows = await domaineService.deleteDomaine(req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('deleted successfully.')
})

router.post('/Domaines/ajout',schema_validation(domaine_validation), async (req, res) => {

    const { titre, description } = req.body
    const affectedRows = await domaineService.createDomaine( titre, description )
    res.status(201).send('created successfully.')
})

// Update a domain entry by its ID
router.put('/Domaines/update/:id', validateDbId('id') ,schema_validation(domaine_validation), async (req, res) => {
   
      const { id } = req.params;
      const { titre, description } = req.body;
      const result = await domaineService.updateDomaineById(id, titre, description);
      if (result.affectedRows === 0) {
        res.status(404).json('no record with given id : ' + req.params.id);
      } else {
        res.status(200).send('updated successfully.');
      }
})

module.exports = router;