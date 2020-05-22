module.exports = options => {
    return async (req, res, next) => {

        // inflection 把 可以把复数转换成 class 单数
        const MedelName = require('inflection').classify(req.params.resource)

        // 在这使用Medel ， 在router中是访问不到的 所以挂载到请求中 req 访问 就直接 req.Medel
        // const Medel = require(`../../models/${MedelName}`)
        req.Medel = require(`../models/${MedelName}`)
        next()
    }
}