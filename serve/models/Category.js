const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId,  ref: 'Category'} // 表示关联指定表的id ref

})
module.exports = mongoose.model('Category', Schema)