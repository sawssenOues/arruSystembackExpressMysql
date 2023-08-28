const Joi = require('joi');

let user_validation = Joi.object({
    nom:Joi.string().min(3).required(),
    prenom:Joi.string().min(3).required(),
    date_naiss:Joi.date().iso().required(),
    email:Joi.string().email().required(),
    image:Joi.string().optional().allow('')

});


module.exports = {
    user_validation
}