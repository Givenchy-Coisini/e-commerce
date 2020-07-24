### 0.PS基础切图教学

##### 基础学习

- 保存图片到本地文件夹下
- 点击左上角文件->打开->选择图片->可以打开我们要测量的图片  Ctrl+O
- Crtl+R：可以打开标尺，或者视图->标尺
- 右击标尺，把里面的单位改为像素（常用）
- Ctrl+ 加号(+)是放大,Ctrl+减号(-)是缩小
- 按住空格键，鼠标可以变成小手，拖动ps视图
- 用选区拖动可以测量大小
- Ctrl+D可以取消选区，或者在旁边空白处点击一下也可以取消选区

- 取色：点击吸管工具，然后点击左边的颜色 会取到对应的颜色

##### ps切图

- 常见的图片的格式

> jpg图像格式：对色彩的信息保留较好，高清，颜色较多，我们产品类的图片经常用jpg格式
>
> gif图像格式：gif格式最多只能存储256色，所以经常用来显示简单图形以及字体，但是可以保存透明背景和动画效果，实际经常用于一些图片小动画效果。
>
> png图片格式是一种新兴的网络图形格式，结合了GIF和JPG的优点。具有存储形式丰富的特点，能保留透明背景，如果想要切成背景透明的图片，请选择png格式。
>
> psd图像格式PSD是ps专用格式，里面存放图层、通道、遮罩等多种设计稿，对我们前端人员来说，最大的优点就是我们可以直接从上面复制文字，获得图片，可以测量大小和距离。

- ![image-20200717174124864](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200717174124864.png)

![image-20200717174143081](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200717174143081.png)

- cutterman最好用的切图工具

![image-20200717184626056](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200717184626056.png)

### 1.Vue基础重新学习

- 目标：
  - 能够说出Vue的基本用法
  - 能够说出Vue的模板语法
  - 能够说出Vue的常用特性
  - 能够基于Vue实现案例效果
- 目录：
  - Vue概述
  - Vue基本使用
  - Vue模板语法
  - 基础案例
  - Vue常用特性
  - 综合案例

##### Vue概述

![](C:\Users\dell\Desktop\学习\前端相关图片\vue路线.png)

- Vue是一个渐进式js框架

- [官网]:https://cn.vuejs.org/v2/guide/

- 易用:熟悉HTML CSS Js 知识后，可以快速上手vue
- 灵活：在一个库和一个完整框架之间自由伸缩
- 高效:20Kb运行大小，超快虚拟DOM

##### hello world

```vue
<!-- 第三集 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <title>Document</title>
</head>
<body>
    <div id="app">
        {{msg}} 插值表达式  可以支持计算和拼接字符串  作用：把数据填充到html里
    </div>
</body>
<script>
    /*
    vue的基本使用步骤：
    1.需要提供标签用于填充数据
    2.引入vue.js文件库
    3.可以用vue的语法功能了
    4.把vue提供的数据填充到标签里面去
    */
    const vm = new Vue({
         el:'#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
        data:{//模型数据 对象
            msg:'hello vue'
        }
    })
    //Vue代码运行原理分析：                           vue框架
    //概述编译过后的概念(Vue语法->原生js语法) 通过vue代码-------->原生js代码  这个过程称之为编译
</script>
</html>
```

##### Vue的模板语法

- 如何理解前端渲染
  -  把数据填充到html标签中

![image-20200723092432831](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200723092432831.png)

- 前端渲染的方式

  -  原生拼接字符串

    ![image-20200723092735774](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200723092735774.png)

  -  使用前端模板引擎

  ![image-20200723092836813](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200723092836813.png)

  -  使用Vue特有的模板语法

    - 插值表达式

    - 指令

      -   什么是自定义属性

      -   指令的本质就是自定义属性

      -   指令的格式：以v-开始

      -   数据响应式：数据发生变化，页面发生了变化数据驱动着变化 这种情况就叫做响应式

        ![image-20200723114748863](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200723114748863.png)

      v-cloak：

      ```js
      //插值表达式存在的问题：“闪动”
      //如何解决->v-cloak
      //解决问题的原理:先隐藏，替换好值之后再显示最终的值
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
          <style>
              [v-cloak] {
                  display: none;
              }
          </style>
          <title>Document</title>
      </head>
      <body>
          <div id="app" v-cloak>
              {{msg}}
          </div>
      </body>
      <script>
            //v-cloak指令的用法
            //1.提供样式       
            [v-cloak] {
                  display: none;
              }
             //2在插值表达式所在的标签中添加V-cloak指令
             //3.原理：先通过样式隐藏内容 ，然后在内存中进行值的替换，替换好之后再显示最终的结果
          const vm = new Vue({
              el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
              data: {//模型数据 对象
                  msg: 'hello vue'
              }
          })
      </script>
      </html>
      ```

      - v-text 填充纯文本

      ​     相比插值表达式更加简洁

      - v-html 填充Html片段

        存在安全问题

        在网站本部数据可以使用，第三方的数据就不可以使用了

      - v-pre 填充原始信息

         显示原始信息，跳过编译过程（分析编译过程）

        ```js
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
            <style>
                [v-cloak] {
                    display: none;
                }
            </style>
            <title>Document</title>
        </head>
        <body>
            <div id="app">
                <div v-cloak>{{msg}}</div>
                <div v-text="msg"></div>
                <!-- v-text中的msg 是一个data中定义的一个属性-->
                <div v-html="msg1"></div>
                <div v-pre>{{msg}}</div>
            </div>
        </body>
        <script>
            const vm = new Vue({
                el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
                data: {//模型数据 对象
                    msg: 'hello vue',
                    msg1:'<h1>html</h1>'
                }
            })
        </script>
        </html>
        ```

        v-once

        ```js
        //在控制台中改变他对应的元素不会改变了
        //应用场景：如果显示的信息后续不需要再修改，可以使用v-once 这样可以提高性能
        ```

        - 双向数据绑定 v-model   input  textra

          -   数据绑定：数据--->页面是单向的
          -   双向数据绑定：数据<--->页面  是双向影响的  修改页面中的表单  会影响数据中的值  修改数据中的值会影响页面的渲染   data中的数据

        - MVVM设计思想

          -  model   view->model 是经过DOM监听
          -  view     model->view 是经过数据绑定
          -  view-model  实现控制的 把两者结合在一起

          ![image-20200723120915220](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200723120915220.png)

    - 事件绑定

      -   v-on：click（标准事件名称）  简写@

      ![image-20200723141132674](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200723141132674.png)

      ```js
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
          <style>
              [v-cloak] {
                  display: none;
              }
          </style>
          <title>Document</title>
      </head>
      <body>
          <div id="app">
              <div v-cloak>{{msg}}</div>
              <div>{{number}}</div>
              <button @click="add">加1</button>  
      <!--这个click可以直接绑定函数名称  （默认传递事件对象），也可以采取函数调用的方式add()-->
          </div>
      </body>
      <script>
          const vm = new Vue({
              el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
              data: {//模型数据 对象
                  msg: 'hello vue',
                  number:0,
              },
              methods: {
                  add(){//methods需要访问data中的数据的时候 必须加上this 这里的this是Vue实例对象vm
                  this.number++
              } 
              }
          })
      </script>
      </html>
      ```

      - 事件函数的参数传递

        -   普通参数和事件传递

        ```js
        <button @click="say('hi',$event)">Say Hi</button>
        //$event 是事件对象 是一个固定的写法 最后一个参数是事件对象
        
  const vm = new Vue({
                el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
            data: {//模型数据 对象
                },
                methods: {
                    /**
                 * 如果事件直接绑定函数名称，那么默认会传递事件 对象作为事件函数的第一个参数
                     * 如果事件绑定的是函数的调用，那么事件对象必须作为最后一个参数显示传递，并且事件对象的名称必须是
                     * $event
                     * 
                    */
                    add() {//默认第一个参数是event
                        this.number++
                    },
                    handler(p, event) {//形参
                        console.log('tag', p)
                        console.log(event.target.innerHTML)
                    }
                }
            })
        ```
        
        -   事件修饰符
        
          ```js
            <div id="app">
                  <div>{{number}}</div>
                  <div @click="add0">
                      <button @click="add">加1</button>
                  </div>
                  <button @click="handler(123, $event)">anniu</button>
              </div>
          </body>
          <script>
              const vm = new Vue({
                  el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
                  data: {//模型数据 对象
                      number:0
                  },
                  methods: {
                 add0() {
                          this.number++
                      },
                      add(event) {//默认第一个参数是event
                          // this.number++
                          event.stopPropagation()//原生阻止冒泡
                      }
                      
           <div @click="add0">//事件修饰符阻止冒泡
                      <button @click.stop="add">加1</button>
            </div>
                  <div>
                      <a href="http://www.baidu.com" @click="zuzhi">百度</a>
                  </div>//阻止事件默认行为
                    zuzhi(event) {//原生
                          event.preventDefault();
                     }
             <a href="http://www.baidu.com" @click.prevent="zuzhi">百度</a>
          ```
        
          - 按键修饰符
        
          ```js
          //@keyup.enter 是回车事件
          //@keyup.delete是删除键
          v-model主要是页面打的字去影响data中的然后让别人在那调用
          ```
        
          - 自定义按键修饰符
          - 全局config.keyCodes对象
            -    Vue.config.keyCodes.f1=112
        
          > 自定义事件修饰符的规则：
          >
          > 自定义按键修饰符名字是自定义的，但是对于的值必须是按键对应的event的keyCodes的值
          >
          >   Vue.config.keyCodes.aaa=65
          >
          >   v-on:keyup.aaa="handle" //aaa也可以直接写成65
    
    
    - 属性绑定
    - 样式绑定
    - 分支循环结构
    
    