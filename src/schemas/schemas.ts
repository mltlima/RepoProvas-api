import Joi from 'joi';

const createUserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

const loginUserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

const schemas = {
    createUserSchema,
    loginUserSchema,
    
};

export default schemas;