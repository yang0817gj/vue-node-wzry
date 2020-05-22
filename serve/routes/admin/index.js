module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true // 表示 接受父路由参数 也就是 resource
    })
    let multer = require('multer');
    let fs = require("fs");
    let path = require("path");

    router.get('/', async (req, res) => {
        // 这样每个接口都需要加，很麻烦， 所有我们使用中间件
        // // inflection 把 可以把复数转换成 class 单数
        // const MedelName = require('inflection').classify(req.params.resource)
        // // 去查找模型
        // const Medel = require(`../../models/${MedelName}`)

        // populate 表示 查询关联字段的数据    Category中我们关联的是parent
        // 这里查询 需要指定字段去查关联字段的数据 每个模块都是不一样的
        const queryOptions = {}
        if (req.Medel.modelName == 'Category') {
            queryOptions.populate = 'parent'
            // console.log(queryOptions);
        }

        const model = await req.Medel.find().setOptions(queryOptions).sort({ parent: 1 }).limit(10).lean()
        res.send(model)
    })

    router.get('/:id', async (req, res) => {
        const model = await req.Medel.findById(req.params.id).lean()
        res.send(model)
    })

    router.post('/', async (req, res) => {
        const model = await req.Medel.create(req.body)
        res.send(model)
    })

    router.delete('/:id', async (req, res) => {
        console.log(req.params.id)
        const model = await req.Medel.findByIdAndDelete(req.params.id)
        res.send(model)
    })

    router.put('/:id', async (req, res) => {
        const model = await req.Medel.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 做通用接口， 接受的动态参数resource 要跟模型存储的一样 方便操作
    // 动态参数 要想在router 使用 也就是子路由  需要在创建子路由中 加上  mergeParams: true 表示接受父路由的参数
    app.use('/admin/api/rest/:resource', async (req, res, next) => {

        // inflection 把 可以把复数转换成 class 单数
        const MedelName = require('inflection').classify(req.params.resource)

        // 在这使用Medel ， 在router中是访问不到的 所以挂载到请求中 req 访问 就直接 req.Medel
        // const Medel = require(`../../models/${MedelName}`)
        req.Medel = require(`../../models/${MedelName}`)
        next()
    }, router)

    app.use('/admin/api/upload', multer({
        //设置文件存储路径
        dest: __dirname + '/../../uploads'   //upload文件如果不存在则会自己创建一个。
    }).single('file'), (req, res) => {
        if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
            res.render("error", { message: "上传文件不能为空！" });
            return
        } else {
            let file = req.file;
            let fileInfo = {};
            console.log(file);
            fs.renameSync('./uploads/' + file.filename, './uploads/' + file.originalname);//这里修改文件名字，比较随意。

            // 获取文件信息
            fileInfo.mimetype = file.mimetype;
            fileInfo.originalname = file.originalname;
            fileInfo.size = file.size;
            fileInfo.path = file.path;

            // 如果前台想访问存储图片 需要给前台返回路径 这里先写死
            fileInfo.url = `http://localhost:3000/uploads/${file.originalname}`
            res.send({
                msg: true,
                file: fileInfo
            })

        }
    });

    app.use('/admin/api/login', async (req, res) => {
        // 获取登录信息
        const { username, pwd } = req.body

        // 用户名不能重复 不能直接拿账号和密码去查
        // 先用用户名去模型中查
        const AdminUser = require('../../models/AdminUser')

        const user = await AdminUser.findOne({ username }).select('+pwd') // select +pwd 表示一起查处pwd 因为模型里设置了select：false 默然是查不出pwd 的
        // 查不出来 直接返回
        if (!user) {
            return res.status(422).send({
                message: '用户不存在'
            })
        }

        // 查出来，就去校验密码
        // compareSync 解析密码
        const flag = require('bcryptjs').compareSync(pwd, user.pwd)

        if (!flag) {
            return res.status(422).send({
                message: '用户校验失败'
            })
        }
        // 返回token
        var jwt = require('jsonwebtoken');
        var token = jwt.sign({ id: user._id }, app.get('secret') );
        res.send({token})

    })
}