const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId,  ref: 'Category'} // 表示关联指定表的id ref

})

// 有时候 我们需要反向查， 谁看关联了自己
// 设置虚拟字段 映射成children字段，不记录在数据库中    
Schema.virtual('children', {
    localField: '_id', // 关联自己那个字段
    foreignField: 'parent', // 关联 字段
    justOne: false, // 是数组还是对象
    ref: 'Category'  // 关联的表名
})
Schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})
 
module.exports = mongoose.model('Category', Schema)