const Joi = require('joi');



let commune_validation = Joi.object({
    nom: Joi.string().min(3).required(),
    gouvernorat_id:Joi.number().required()
});
let cartier_validation = Joi.object({
    nom: Joi.string().min(3).required(),
    commune_id:Joi.number().required()
});

module.exports = {
    commune_validation,
    cartier_validation
}