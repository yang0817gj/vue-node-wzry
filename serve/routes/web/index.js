module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Category = mongoose.model('Category')

    router.get('/init', async (req, res) => {
        const parent = await Category.findOne({ name: '新闻分类' })
        const Cats = await Category.find().where({
            parent: parent
        }).lean()
        const newsCat = ["【520情侣皮肤】所有等待，只为重逢", "UI改造日志第四期：背包系统优化在即，局内快捷消息更智能！", "《五虎上将交响曲》揭秘，一起来看看你的音乐公开课随堂笔记吧！", "0元免流畅玩包，轻轻松松上王者", "王者荣耀联合乘车码送豪华大礼，五五开黑不氪金！", "5月26日全服不停机更新公告", "5月26日服务器优化升级公告", "5月22日实战模拟维护公告", "5月22日体验服停机更新公告", "5月22日iOS登录异常及补偿公告", "应援KPL得好礼，福利清单就绪", "DIY告白信 520陪您花式告白", "爱在峡谷 甜蜜520", "峡谷迎初夏，好礼领不停", "黄忠-烈魂五虎上将限定皮肤即将上架，缤纷好礼齐降临", "虎牙明星主播踢馆名校战队，峡谷高材生与学霸的荣耀对决", "2020年KPL春季赛常规赛最佳阵容及最佳选手评选方式公布", "2020年KPL春季赛季后赛赛程赛制公布，5月28日16:00热血开战", "【原创内容大赛音乐比赛】优秀作品合集（二）", "大众赛事合作赛道全面开启，携手合作伙伴共建王者电竞生态"]
        const news = newsCat.map(el => {
            const randomCats = Cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: el
            }
        })
        // deleteMany({}) 表示 以任意条件去删除
        await Article.deleteMany({})
        await Article.insertMany(news)
        res.send(news)

    })
    router.get('/news/list', async (req, res) => {

        const parent = await Category.findOne({ name: '新闻分类' }).lean()

        const cats = await Category.aggregate([
            {
                $match: { parent: parent._id }, // 条件查询
            },
            {
                $lookup: {   // 相当于 设置虚拟字段
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList' // 起名字
                }
            },
            {
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }
                }
            }  

        ])


        // const parent = await Category.findOne({ name: '新闻分类' }).populate({
        //     path: 'children'
        // }).lean()
        res.send(cats)
    })
    app.use('/web/api', router)
}