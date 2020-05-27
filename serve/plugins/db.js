module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/vue-node-wzry', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    mongoose.set('useFindAndModify', false)
    
    // 在数据库中，各种关联
    // 比如 在 A 模型引入了B 模型 B 模型又没引入过来，没有使用过它 可能会报错
    // 一般 我们在数据库中把所有模型都引用一遍

    // require-all 把一个文件下 所有文件引入进来
    require('require-all')(__dirname + '/../models')
}