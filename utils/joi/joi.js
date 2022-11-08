const Joi = require('joi');

const schemaPost = Joi.object().keys({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30).
        required(),
    email: Joi.string()
        .email({ tlds: false }).
        required(),
    phone: Joi.number().integer().required()
})

const schemaPut = Joi.object().keys({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    email: Joi.string()
        .email({ tlds: false }),
    phone: Joi.number().integer()
});

module.exports = {
    schemaPost, schemaPut
}