const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    username: { type: String },
    pwd: {
        type: String,
        set(val) {
            // return val  //用户填什么值 ， 就原封不动存什么值
            return require('bcryptjs').hashSync(val, 10) // 对 用户传来的密码进行散列操作
            // 同样的密码 每次散列的数据都不一样， 所以我们不需要给用户返回  设置 select: false
        },
        select: false // 查询不会返回
    }
})
module.exports = mongoose.model('AdminUser', Schema)