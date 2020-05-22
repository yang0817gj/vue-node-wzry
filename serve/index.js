const express = require('express')
const app = express()
app.use(require('cors')())
app.use(express.json())
app.set('secret', '1asdjashh2')
// 这里是静态文件访问  
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)


app.listen(3000, () => {
    console.log('http://localhost:3000')
})