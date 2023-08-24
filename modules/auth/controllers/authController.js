const router = require('express').Router()
const authServices = require('../services/authServices')




router.post('/register', async (req, res) => {

    const { nom, email, password } = req.body
    const affectedRows = await authServices.createAdmin( nom, email, password )
    res.status(201).send('created successfully.')
})

module.exports = router;





