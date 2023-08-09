const express = require('express')
const router = express.Router()

const gouvernoratService = require('../services/gouvernoratServices')
const {validateDbId } = require('../../../middleware/index');

router.get('/', async (req, res) => {
   const gouvernorats = await gouvernoratService.getAllgouvernorats()
   res.send(gouvernorats)
})

router.get('/:id',validateDbId('id') , async (req, res) => {
   const gouvernorat = await gouvernoratService.getgouvernoratById(req.params.id)
   if (gouvernorat == undefined)
       res.status(404).json('no record with given id : ' + req.params.id)
   else
       res.send(gouvernorat)
})



module.exports = router;