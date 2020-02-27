const Joi = require('joi');
module.exports = {
    add: {
        data: {
            body: {
                id: Joi.string()
                    .min(3)
                    .max(40)
                    .trim()
                    .required(),
                property_type: Joi.string()
                    .min(3)
                    .max(40)
                    .trim()
                    .required(),
                category: Joi.string()
                    .min(3)
                    .max(40)
                    .trim()
                    .required(),
                location: Joi.string()
                    .min(5)
                    .trim()
                    .required(),

                bedrooms: Joi.number()
                    .positive()
                    .integer()
                    .required(),
                bathrooms: Joi.number()
                    .positive()
                    .min(1)
                    .integer()
                    .required(),
                listing_price: Joi.number()
                    .positive()
                    .min(1)

                    .integer()
                    .required(),
                title: Joi.string()
                    .min(5)
                    .max(40)
                    .trim()
                    .trim()
                    .required(),
                description: Joi.string()
                    .min(3)
                    .max(40)
                    .trim()
                    .required(),
            }
        }

    },
    getUser: {
        query: {
            user_id: Joi.string().required()
        }
    }
}