module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })
    router.get('/categories', async (req, res) => {
        // const model = await Category.deleteMany()
        const model = await Category.find().limit(10).lean()
        res.send(model)
    })
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id).lean()
        res.send(model)
    })

    router.delete('/categories/:id', async (req, res) => {
        console.log(req.params.id)
        const model = await Category.deleteOne({_id: req.params.id})
        res.send(model)
    })
    
    app.use('/admin/api', router)
}