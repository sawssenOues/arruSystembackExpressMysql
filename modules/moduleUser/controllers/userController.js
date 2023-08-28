const express = require('express')
const router = express.Router()

const userService = require('../services/userServices')
const { schema_validation, validateDbId, verifycookie } = require('../../../middleware/index');
const { user_validation } = require('../validation/moduleValidation');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set your desired directory path
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)


    },
});
const upload = multer({ storage: storage });


router.get('/users', verifycookie, async (req, res) => {
    const users = await userService.getAllusers()
    res.send(users)
})

router.get('/users/:id', validateDbId('id'), async (req, res) => {
    const user = await userService.getuserById(req.params.id)
    if (user == undefined)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send(user)
})

router.delete('/users/delete/:id', validateDbId('id'), async (req, res) => {
    const affectedRows = await userService.deleteuser(req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('deleted successfully.')
})

router.post('/users/ajout', upload.single('image'), schema_validation(user_validation), async (req, res) => {
    const { nom, prenom, date_naiss, email } = req.body
    const imagename = req.file.filename
    const dateTimeString = `${date_naiss}T20:30:15.000Z`;
    const affectedRows = await userService.createuser(nom, prenom, dateTimeString, email, imagename)
    res.status(201).send('created successfully.')
})

// Update a user entry by its ID
router.put('/users/update/:id', validateDbId('id'), upload.single('image'), schema_validation(user_validation), async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, date_naiss, email } = req.body;
    const imagename = req.file.filename;
    const dateTimeString = `${date_naiss}T20:30:15.000Z`;

    // Check if the record with the given ID exists before attempting to update
    const existingRecord = await userService.getuserById(id);

    if (!existingRecord) {
        return res.status(404).json({ error: 'No record with the given id: ' + id });
    }

    const result = await userService.updateuserById(id, nom, prenom, dateTimeString, email, imagename);

    return res.status(200).send('Updated successfully.');
});


module.exports = router;