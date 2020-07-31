const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 原理：进入自动打包的路径中的时候没有进行首页渲染  还需要进行点击src 不太方便
// 于是把src 下面的index.html 页面 放在根路径下就可以直接访问的到了
const htmlPlugin=new HtmlWebpackPlugin({//创建实例对象
    template:'./src/index.html',//指定要用到的模板文件
    filename:'index.html'//指定生成的文件名称,该文件存在于内存中,在目录中不显示
})

const VueLoaderPlugin=require('vue-loader/lib/plugin')//构造函数
module.exports={
    // 编译模式
    /***
     * 
     * 配置打包的入口和出口
     * webpack4.0版本中默认
     * 打包的入口文件是：src->index.js
     * 打包的出口文件是：dist->main.js
     * 
     * 自动打包功能  热更新
     * pack.json 中 dev的命令  由webpack改成webpack-dev-server
     * webpack-dev-server 会启动一个实时打包的http服务器
     * webpack-dev-server 打包生成的输出文件 默认放到了项目根目录中  是虚拟的、看不见的
     * 
     * 
     *上线与打包  pack.json  build
     */
    mode:'development', //development开发    production生产
    entry:path.join(__dirname,'./src/index.js'),//自定义打包入口  __dirname是根目录
    output:{
        path:path.join(__dirname,'./dist'),//输出文件的存放路径
        filename:'bundle.js'//输出文件的名称
    },
    plugins:[htmlPlugin,new VueLoaderPlugin()],//插件
    // webpack默认只能处理以.js结尾的文件 如果有不是.js文件结尾的 需要寻找对应的loader来处理
    module:{//loader是加载器
        rules:[//use数组中指定的loader 顺序是固定的 多个loader的调用顺序是：从后往前调用
            {test:/\.css$/,use:['style-loader','css-loader','postcss-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,use:'url-loader?limit=16940'},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            {test:/\.vue$/,use:'vue-loader'}

            // limit 只有小于limit 大小的图片,才会被转为base64图片 这中图片加载更快
        ]
    }
}