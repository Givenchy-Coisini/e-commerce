const express = require('express')
const compression = require('compression')
const app = express()

// 一定要把这一行代码 写在 静态资源托管之前
app.use(compression())// 压缩
app.use(express.static('./dist'))
app.listen(80, () => {
    console.log('server running at http://127.0.0.1')
})