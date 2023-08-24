const router = require('express').Router()
const authServices = require('../services/authServices')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const { nom, email, password } = req.body
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const affectedRows = await authServices.createAdmin(nom, email, hashedPassword)
    res.status(201).send('created successfully.')
})

router.post('/login', async (req, res) => {
    const admin = await authServices.getadminbyemail(req.body.email)

    if (!admin) {
        return res.status(404).send({
            message: 'admin not found'
        })
    }
    if (!await bcrypt.compare(req.body.password, admin.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }
    const token = jwt.sign({ id: admin.id }, "secretcodepersonalized")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000 // 1 hour
    })

    res.send({
        message: 'success'
    })

})

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'success'
    })
})


module.exports = router;





