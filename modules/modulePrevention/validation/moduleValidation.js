const Joi = require('joi');

let domaine_validation = Joi.object({
    titre: Joi.string().min(3).required(),
    description: Joi.string().optional().allow('')
});

let risque_validation = Joi.object({
    titre: Joi.string().min(3).required(),
    description: Joi.string().optional().allow(''),
    domaine_id:Joi.number().required()
});

let mesure_validation = Joi.object({
    titre: Joi.string().min(3).required(),
    description: Joi.string().optional().allow(''),
    risque_id:Joi.number().required()
});

module.exports = {
    domaine_validation,
    risque_validation,
    mesure_validation
}