module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })
    router.get('/categories', async (req, res) => {
        // populate 表示 查询关联字段的数据    Category中我们关联的是parent
        const model = await Category.find().populate('parent').sort({parent: 1}).limit(10).lean()
        res.send(model)
    })
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id).lean()
        res.send(model)
    })

    router.delete('/categories/:id', async (req, res) => {
        console.log(req.params.id)
        const model = await Category.findByIdAndDelete(req.params.id)
        res.send(model)
    })

    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 只查询最顶级父元素
    // router.get('/category/parents', async (req, res) => {
    //     // const model = await Category.deleteMany()
    //     const model = await Category.find().where({name: ''})
    //     res.send(model)
    // })
    
    app.use('/admin/api', router)
}