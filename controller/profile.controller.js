const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    const { user_id, picture, birth_day, address } = req.body

    const payload = {
        user_id,
        picture,
        birth_day,
        address
    }

    try {
        const profiles = await prisma.profiles.create({
            data: payload
        })

        let resp = ResponseTemplate(profiles, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Get(req, res) {

    const { user_id, picture, birth_day, address } = req.query

    const payload = {}

    if (user_id) {
        payload.user_id = user_id
    }

    if (picture) {
        payload.picture = picture
    }

    if (birth_day) {
        payload.birth_day = birth_day
    }

    if (address) {
        payload.address = address
    }

    try {

        const profiles = await prisma.profiles.findMany({
            where: payload
        });

        let resp = ResponseTemplate(profiles, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function GetByPK(req, res) {

    const { id } = req.params

    try {
        const profiles = await prisma.pictures.findUnique({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(profiles, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { user_id, picture, birth_day, address } = req.body
    const { id } = req.params

    const payload = {}

    if (!user_id && !picture && !birth_day && !address) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (user_id) {
        payload.user_id = user_id
    }

    if (picture) {
        payload.picture = picture
    }

    if (birth_day) {
        payload.birth_day = birth_day
    }

    if (address) {
        payload.address = address
    }


    try {
        const profiles = await prisma.profiles.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(profiles, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Delete(req, res) {

    const { id } = req.params

    try {
        const profiles = await prisma.profiles.delete({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(null, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}


module.exports = {
    Insert,
    Get,
    GetByPK,
    Update,
    Delete
}