
const { ResponseTemplate } = require('../helper/template.helper')
const Joi = require('joi');

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function CheckUser(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().alphanum().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(8).required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}

async function CheckProfile(req, res, next) {
    const schema = Joi.object({
        user_id: await prisma.pictures.findUnique({
            where: {
                id: Number(req.params.id)
            }
        }),
        name: Joi.string().alphanum().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(8).required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}


module.exports = {
    CheckUser,
    CheckProfile
}