const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],

}, {
    timestamps: true
})
module.exports = mongoose.model('Article', Schema)
// 第三个参数 就是 Article 小写 复数 形式  也就是集合名称