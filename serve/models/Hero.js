const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    banner: { type: String },
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    // 技能
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        cooling: { type: Number },
        consume: { type: Number },
    }],
    // 顺风出装
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    // 逆风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],

    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partnerts: [{
        hero: { type: mongoose.SchemaType.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]

})
module.exports = mongoose.model('Hero', Schema)