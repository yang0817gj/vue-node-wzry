module.exports = option => {
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    return async (req, res, next) => {
        const token = (req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
        const decoded = jwt.verify(token, req.app.get('secret'));
        assert(decoded, 401, '请先登录')
        req.user = await AdminUser.findById(decoded.id)
        assert(req.user, 401, '请先登录')
        next()
        // try {
        //     const decoded = jwt.verify(token, app.get('secret'));

        //     const User = await AdminUser.findById(decoded.id)
        //     if (User) {
        //         next()
        //     } else {
        //         return res.status(401).send({ message: '请重新登录' })
        //     }

        // } catch (error) {
        //     return res.status(401).send({ message: '请重新登录' })
        // }

    }
}