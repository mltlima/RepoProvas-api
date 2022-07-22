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

const testSchema = Joi.object().keys({
    name: Joi.string().required(),                
    pdfUrl: Joi.string().regex(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/).required(),
    categoryId: Joi.number().required(),
    teacherDisciplineId: Joi.number().required()
});

const categorySchema = Joi.object().keys({
    name: Joi.string().required()
});

const schemas = {
    createUserSchema,
    loginUserSchema,
    testSchema,
    categorySchema
};

export default schemas;