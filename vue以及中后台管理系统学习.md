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
        
        ```

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
    
    ```js
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
            <a v-bind:href="url">百度</a>
        </div>
        <script>
              //v-bind能够很好地去动态的改变属性
            const vm = new Vue({
                el: '#app',
                data: {
                    url: 'http://www.baidu.com'
                },
                methods: {
    
                },
            })
        </script>
    </body>
    
    </html>
    ```
    
    - 双向数据绑定原理
    
    ```js
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
           <div>
               {{msg}}
           </div>
            <input type="text" v-bind:value="msg" @input="handle">
        </div>
        <script>
            const vm = new Vue({
                el: '#app',
                data: {
                   msg:'hello'
                },
                methods: {
                    /**
                     * v-bind:是属性用data中的数据代替
                     * handle处理函数是先拿到输入框的值，在把值赋给result 然后再把数据中的msg给改变一下
                    */
                    handle(event){
                        let result = event.target.value
                        this.msg=result
                    }
                },
            })
        </script>
    </body>
    </html>
    ```
    
    - 样式绑定
    
    ```js
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <style>
            .active{
                border: 1px red solid;
                width: 100px;
                height: 100px;
            }
            .error{
                background-color: aqua;
            }
    
            .test{
                color: blue;
            }
        </style>
        <title>Document</title>
    </head>
    <body>
        <div id="app">
            <div :class="[activeClass,errorClass,{test:isTest}]">
                {{msg}}
                <!-- v-bind绑定class样式为active的样式 用isActive 在事件中改变其值来影响
                经常用于tabbar切换  给定一个样式  在满足某条件的时候会触发样式改变
                -->
            </div>
            <button @click="handle">qiehuan</button>
         <script>
             /*
            对象绑定和数组绑定可以结合使用
            class绑定的值可以简化操作
            默认的class如何处理   默认的class会被保留
             */
             const vm = new Vue({
                 el: '#app',
                 data: {
                    msg:'hello',
                    isTest:true,
                    activeClass:'active',//数组的用法  这里的值是css中的
                    errorClass:'error'
                 },
                 methods: {
                     /**
                      * v-bind:是属性用data中的数据代替
                      * handle处理函数是先拿到输入框的值，在把值赋给result 然后再把数据中的msg给改变一下
                      * class样式处理  对象语法：<div v-bind:class="{active:isActive}"></div>
                      * 数组语法:<div v-bind:class="[activeClass,errorClass]"></div>
                      * 可以设置当页面渲染的时候 这个样式显示 当输入密码的时候另外一个样式显示  掘金就是
                      */
                     handle(event){
                     //控制isActive在true和false之间切换
                     this.isTest=!this.isTest
                     this.activeClass=this.errorClass=''
                     }
                 },
             })
         </script>
    </body>
    </html>
    ```


​    

    - 分支循环结构
    
    ```js
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <style>
            [v-cloak]{
                display: none;
            }
        </style>
        <title>Document</title>
    </head>
    
    <body>
        <div id="app">
            <div v-cloak>
                {{content}}
            </div>
            <ul>
                <li v-for="item in fruits">{{item}}</li>
            </ul>
        </div>
        <script>
            /**
             *分支结构的时候  v-if 和v-show区别：v-if控制（DOM元素的增加和删除）是否渲染到页面 变化就很小了不频繁渲染，v-show控制元素是否显示(已经渲染到了页面)频繁的显示和隐藏
             * 循环结构
            */
            const vm = new Vue({
                el: '#app',
                data: {
                    fruits: ['apple', 'orange', 'bannan'],
                    content:'水果列表'
                },
                methods: {
    
                },
            })
        </script>
    </body>
    
    </html>
    ```

- forin  循环以及v-if 和v-for一起使用

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
        <div v-cloak>
            {{content}}
        </div>
        <ul>
            <li v-for="item in fruits">{{item}}</li>
        </ul>
        <!-- 遍历对象 -->
        <div v-if="value==18" v-for="(value,key,index) in Obj">
            {{value+'---'+key+'----'+index}}
        </div>
        <!-- v-if 满足某些条件的时候才会进行遍历 -->
    </div>
    <script>
        /**
         * 循环结构
         * 原生js遍历对象
        */
        var Obj = {
            uname: 'lisi',
            cname: '李四',
            age: 18
        }
        for (var key in Obj) {//for in遍历对象
            console.log(key,Obj[key])
        }
        const vm = new Vue({
            el: '#app',
            data: {
                fruits: ['apple', 'orange', 'bannan'],
                content: '水果列表',
                Obj: {
                    uname: 'lisi',
                    cname: '李四',
                    age: 18
                }
            },
            methods: {

            },
        })
    </script>
</body>

</html>
```

##### 基础案例

- ​    1.实现静态ui效果

  ​     \* 用传统的方式实现标签和结构样式

  ​     \* 2.基于数据重构ui效果

  ​     \* 将静态的结构和样式重构为基于Vue模板语法的形式

  ​     \* 处理事件绑定和控制逻辑

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>
        .tab ul {
            overflow: hidden;
            padding: 0;
            margin: 0;
        }

        .tab ul li {
            box-sizing: border-box;
            padding: 0;
            float: left;
            width: 100px;
            height: 45px;
            line-height: 45px;
            list-style: none;
            text-align: center;
            border-top: 1px solid blue;
            border-right: 1px blue solid;
            cursor: pointer;
        }

        .tab ul li:first-child {
            border-left: 1px solid blue;
        }

        .tab ul li.active {
            background-color: aqua;
        }

        .tab div {
            width: 500px;
            height: 300px;
            display: none;
            text-align: center;
            font-size: 30px;
            line-height: 300px;
            border: 1px blue solid;
            border-top: 0px;
        }
        .tab div.current{
            display: block;
        }
    </style>
    <title>Document</title>
</head>

<body>
    <div id="app">
        <div class="tab">
            <ul>
                <li @click="change(index)" :class='currentindex===index?"active":""' v-for="(item,index) in list" :key="item.id">
                    {{item.title}}</li>
            </ul>
            <div :class='currentindex===index?"current":""'v-for="(item,index) in list" :key="item.id">
                {{item.content}}
                <!-- 这里如果是标签的话 比如：img  src 如果属性值是data中的数据的时候 要记得加v-bind -->
            </div>
        </div>
    </div>
    <script>
        /**
         * 1.实现静态ui效果
         * 用传统的方式实现标签和结构样式
         * 2.基于数据重构ui效果
         * 将静态的结构和样式重构为基于Vue模板语法的形式
         * 处理事件绑定和控制逻辑
        */
        const vm = new Vue({
            el: '#app',
            data: {
                currentindex: 0,//选项卡当前的索引
                list: [{
                    id: 1,
                    title: 'apple',
                    content: '苹果'
                }, {
                    id: 2,
                    title: 'orange',
                    content: '橘子'

                }, {
                    id: 3,
                    title: 'lemo',
                    content: '柠檬'
                }]
            },
            methods: {
                change(index){
                    //在这里实现选项卡切换逻辑  本质就是操作类名
                    //如何切换类名：currentIndex
                    this.currentindex=index

                }

            },
        })
    </script>
</body>
</html>
```

##### vue常用特性

- 表单操作

```js
<!-- 第三集 -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>

    </style>
    <title>Document</title>
</head>

<body>
    <div id="app">
        <form action="http://itcast.cn">
            <div>
                <span>姓名:</span>
                <span>
                    <!-- 表单修饰符 -->
                    <!-- number 转化为数值
                    trim：去掉开始和结尾的空格
                    lazy：将input事件切换为change事件
                    input事件是只要有内容发生变化就会触发
                    change是失去焦点才会触发
                    在v-model后面加
                    -->

                    <input type="text" v-model="uname">
                </span>
            </div>
            <div>
                <span>性别:</span>
                <span>
                    <!-- value =1 的时候 选择的是男 -->
                    <input type="radio" id="male" value="1" v-model="gender">
                    <label for="male">男</label>
                    <input type="radio" id="female" value="2" v-model="gender">
                    <label for="female">女</label>
                </span>
            </div>
            <div>
                <span>爱好:</span>
                <span>
                    <input type="checkbox" name="" id="ball" value="1" v-model="hobby">
                    <label for="ball">篮球</label>
                    <input type="checkbox" name="" id="sing" value="2" v-model="hobby">
                    <label for="ball">唱歌</label>
                    <input type="checkbox" name="" id="code" value="3" v-model="hobby">
                    <label for="ball">写代码</label>
                </span>
            </div>
            <div>
                <span>职业:</span>
                <select name="" v-model="occupation" multiple>
                    <option value="0">请选择职业...</option>
                    <option value="1">教师</option>
                    <option value="2">软件工程师</option>
                    <option value="3">讲师</option>

                </select>
            </div>
            <div>
                <span>个人简历:</span>
                <textarea name="" id="" cols="30" rows="10" v-model="desc"></textarea>
            </div>
            <div>
                <input type="submit" value="提交" @click.prevent="handle">
            </div>

        </form>
    </div>
</body>
<script>

    const vm = new Vue({
        el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
        data: {//模型数据 对象
            uname: 'lisi',
            gender: '1',
            hobby: ['1', '2'],
            occupation: ['1', '2'],
            desc: 'hdhfj'
        },
        methods: {
            handle() {
                console.log(this.uname + this.gender)
                console.log(this.hobby.toString())
                console.log(this.occupation)
            }
        }

    })
</script>

</html>
```

- 自定义指令
  -  为什么使用自定义指令？--->内置指令不满足要求

```js
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
        <input type="text" v-color="msg">
        <input type="text" v-focus>
    </div>
</body>
<script>
    /**
    自定义指令
    */
    Vue.directive('focus', {
        inserted(el) {
            //el:表示指令所绑定的元素
            el.focus()
        }
    })
    // Vue.directive('color', {
    //     bind(el, binding) {
    //         //el:表示指令所绑定的元素
    //         // el.focus()
    //         //根据指令的参数 设置背景颜色
    //         console.log(binding.value)
    //         el.style.backgroundColor = binding.value
    //     }
    // })
    const vm = new Vue({
        el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
        data: {//模型数据 对象
            number: 0,
            msg: 'yellow'//也可以是一个对象
        },
        methods: {


        },
        //局部指令  只能在本组件中使用
        directives: {
            color: {
                bind(el, binding) {
                    //el:表示指令所绑定的元素
                    // el.focus()
                    //根据指令的参数 设置背景颜色
                    console.log(binding.value)
                    el.style.backgroundColor = binding.value
                }
            },
            //可以定义多个指令
        }

    })
</script>

</html>
```

- 计算属性
  - 为什么要使用计算属性：表达式的计算逻辑可能会比较复杂，使用计算属性可以使模板内容更加简洁

```js
<!-- 第三集 -->
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
        <div>{{msg}}</div>
        <div>{{reverseString}}</div>
        <div>{{reverseString}}</div>
        <div>{{reverseMessage()}}</div>
        <div>{{reverseMessage()}}</div>
    </div>
</body>
<script>

    const vm = new Vue({
        el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
        data: {//模型数据 对象
            msg: 'hello'
        },
        computed: {//计算属性  根据data 的数变化的
            reverseString() {
                console.log('conputed')
                return this.msg.split('').reverse().join('')  //return 必须要加
                // split分隔字符串  reverse反转  join拼接字符串
            }
        },
        //计算属性和方法的区别：计算属性是基于他们的依赖(data中的数据)进行缓存的  方法中不存在缓存 计算属性节省性能
        methods: {
            //方法是每调用一次 执行一次函数
            reverseMessage: function () {
                console.log('methods')
                return this.msg.split('').reverse().join('')
            }
        }

    })
</script>

</html>
```



- 过滤器

![image-20200728184215482](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200728184215482.png)

```js
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
        <input type="text" v-model="msg">
        <div>{{msg | upper}}</div>
        <!-- 前面处理的结果作为下一个的输入值 -->
        <div>{{msg | upper | lower}}</div>
    </div>
</body>
<script>
    /*
   过滤器:就是在处理数据 -->格式化数据
   插值表达式 和属性绑定
    */
    Vue.filter('upper', function (val) {
        //upper 是过滤器的名字，val是我们要处理的数据
        return val.charAt(0).toUpperCase() + val.slice(1)
        // charAt(0)首字符  大写  slice(1)从第二个字母到最后
    })
    Vue.filter('lower', function (val) {
        //upper 是过滤器的名字，val是我们要处理的数据
        return val.charAt(0).toLowerCase() + val.slice(1)
        // charAt(0)首字符  大写  slice(1)从第二个字母到最后
    })
    const vm = new Vue({
        el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
        data: {//模型数据 对象
            msg: ''
        },
        methods: {

        },
        filters:{//局部  只有在本组件中可以使用
            upper:function(){

            }
        }

    })
</script>

</html>
```



- 侦听器

![image-20200728180341835](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200728180341835.png)

```js
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
        <div>
            <span>
                名:
            </span>
            <span>
                <input type="text" v-model="firstName">
            </span>
        </div>
        <div>
            <span>姓:</span>
            <span>
                <input type="text" v-model="lastName">
            </span>
        </div>
        <div>{{fullName}}</div>
    </div>
</body>
<script>

    const vm = new Vue({
        el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
        data: {//模型数据 对象
            firstName: 'Jim',
            lastName: 'Green',
            fullName: 'Jim Green'
        },
       watch: {//监听器  当数据发生变化的时候 他也跟着变化
             firstName(val) {//val是新的值
                this.fullName = val + '  ' + this.lastName
            },
            lastName(val) {
                this.fullName = this.firstName + '  ' + val
            }
        },
        computed: {//计算属性也能实现
            fullName() {
                return this.firstName + ' ' + this.lastName
            }
        },
        methods: {

        }

    })
</script>

</html>
```



- 声明周期

  ```js
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
          <div>{{msg}}</div>
          <button @click="update">更新</button>
          <button @click="destory">销毁</button>
      </div>
  </body>
  <script>
      /*
      Vue实例生命周期的主要阶段：
      挂载（初始化相关属性）
      1.beforeCreate
      2.created
      3.beforeMount
      4.mounted
      更新
      1.beforeUpdate
      2.update
      销毁
      1.beforeDestroy
      2.destroyed
     
      */
      const vm = new Vue({
          el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
          data: {//模型数据 对象
              msg: '生命周期'
          },
          methods: {
              update() {
                  this.msg = 'hello'
              },
              destory(){
                  this.$destroy()
              }
          },
          beforeCreate() {
              console.log('beforeCreate')
          },
          created() {
              console.log('created')
          },
          beforeMount() {
              console.log('beforeMount')
          },
          mounted() {//初始化完成  模板内容渲染完成,请求后台 填充数据
              console.log('mounted')
          },
          beforeUpdate() {
              console.log('beforeUpdate')
          },
          updated() {
              console.log('updated')
          },
          beforeDestroy() {
              console.log('beforeDestroy')
          },
          destroyed() {
              console.log('destroyed')
          },
  
      })
  </script>
  
  </html>
  ```

  

##### 组件化开发

![image-20200729103959731](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200729103959731.png)

- 组件注册

```js
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
        <button-counter></button-counter>
        <button-counter></button-counter>
        <button-counter></button-counter>
        <hello-mwj></hello-mwj>
    </div>
</body>
<script>
    /**
     * 组件的命名方式：驼峰式  短横线式
     * 根组件的话 不能用驼峰式的
     * **/
    Vue.component('button-counter', {
        data() {//data必须是一个函数
            // 形成闭包的环境，保证每一份组件都拥有一份独立的数据
            return {
                count: 0
            }
        },
        template: '<button @click="handle">点击了{{count}}次</button>',
        // 可以是模板字符串  可以多行看着比较舒服
        // 组件的模板内容必须是包含单个根元素
        methods: {
            handle() {
                this.count += 2
            }
        }
    })
    var HelloWordA = {
        data() {
            return {
                msg: 'helloWorld'
            }
        },
        template: '<div>{{msg}}</div>'
    },
    var HelloWordB= {
        data() {
            return {
                msg: 'helloWorld'
            }
        },
        template: '<div>{{msg}}</div>'
    },
    var HelloWordC = {
        data() {
            return {
                msg: 'helloWorld'
            }
        },
        template: '<div>{{msg}}</div>'
    },
    const vm = new Vue({
        el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
        data: {//模型数据 对象

        },
        methods: {

        },
        components: {//局部组件只能在注册他的父组件中使用
            'hello-world':HelloWordA,
            'hello-wass':HelloWordB,
            'hello-mwj':HelloWordC
        }

    })
</script>

</html>
```

![image-20200729140106254](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200729140106254.png)

![image-20200729140157012](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200729140157012.png)

- props接受的数据类型：

  > 字符串:String
  >
  > 数值：Number
  >
  > 布尔值:Blooean
  >
  > 数组  对象  Array  Object

- props传递数据原则：单向数据流
- 子组件通过自定义事件向父组件传递信息  $event 
- $emit()

![image-20200729141440440](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200729141440440.png)

![image-20200729141915958](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200729141915958.png)

- 组件插槽
  -   父组件向子组件传递内容（模板）

![image-20200729143333087](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200729143333087.png)

- slot位于子组件的模板中  父组件中的中间还有东西

```js
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
        <text-alert>有bug</text-alert>
        <text-alert></text-alert>
        <base-layout>
            <p slot="header">标题信息</p>
            <p>zhuyaoneirong</p>
            <p slot="footer">dibu信息</p>
        </base-layout>
    </div>
</body>
<script>
    Vue.component('text-alert', {
        template: `
            <div>
                <strong>ERROR:</strong>
                <slot>默认内容</slot>
                </div>
            `
    })
    Vue.component('base-layout', {
        template: `
            <div>
               <header>
                <slot name="header"></slot>
                </header>
                <main>
                    <slot></slot>
                    </main>
                    <footer>
                        <slot name="footer"></slot></footer>
                </div>
            `
    })
    const vm = new Vue({
        el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
        data: {//模型数据 对象
        },
        methods: {

        }

    })
</script>

</html>
```

##### 前后端交互

![image-20200729183243881](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200729183243881.png)

![image-20200729183713442](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200729183713442.png)

![image-20200729183820235](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200729183820235.png)

![image-20200729184017924](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200729184017924.png)

- Promise用法
  
  -  ![image-20200729212211103](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200729212211103.png)
  
  ![image-20200730090845339](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730090845339.png)
  
- fetch

![image-20200730093959099](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730093959099.png)

![image-20200730094224951](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730094224951.png)

![image-20200730095549130](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730095549130.png)

![image-20200730095829051](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730095829051.png)

- axios

![image-20200730192016879](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730192016879.png)

![image-20200730192243047](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730192243047.png)

![image-20200730192307359](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730192307359.png)

![image-20200730192323334](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730192323334.png)

![image-20200730192448070](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730192448070.png)

- 前端如果用params的话，后端用的是query 

![image-20200730192713033](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730192713033.png)

![image-20200730192813474](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730192813474.png)

![image-20200730200529120](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730200529120.png)

![image-20200730201202919](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730201202919.png)

![image-20200730203410121](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730203410121.png)

##### 前端路由学习

- ![image-20200730204423263](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730204423263.png)

![image-20200730205515210](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730205515210.png)

![image-20200730205645464](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730205645464.png)

![image-20200730205712808](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730205712808.png)

![image-20200730234207420](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730234207420.png)

![image-20200730234540780](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730234540780.png)

![image-20200730234801011](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730234801011.png)

![image-20200730234948974](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730234948974.png)

![image-20200730235001376](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730235001376.png)

![image-20200730235402530](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200730235402530.png)

- 路由重定向
- ![image-20200731001301758](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731001301758.png)

![image-20200731001830525](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731001830525.png)

```Vue
<!-- 第三集 -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <title>Document</title>
</head>

<body>
    <div id="app">
        <router-link to="/user">User</router-link>
        <router-link to="/register">Register</router-link>
        <!-- 路由填充位 -->
        <router-view></router-view>
    </div>
</body>
<script>
    /*
    路由使用的基本步骤：

    1.引入相关的库文件
    2.添加路由链接
    3.添加路由填充位
    4.定义路由组件
    5.配置路由规则并创建路由实例
    6.把路由挂载到Vue根实例中
 
    */
    const User = {
        template: "<h1>user组件</h1>"
    }
    const Register = {
        template: `
        <div>
            <h1>Register组件</h1>
            <hr/>
            <router-link to="/register/tab1">Tab1</router-link>
            <router-link to="/register/tab2">Tab2</router-link>
           <!-- 子路由填充位置-->
            <router-view></router-view>
        </div>
       `
    }
    const Tab1={
        template:'<h3>Tab1</h3>'
    }

    const Tab2={
        template:'<h3>Tab2</h3>'
    }
    // 创建路由实例对象
    var router = new VueRouter({
        routes: [{
            path: '/',
            redirect: '/user'//路由重定向
        }, {
            path: '/user',
            component: User
        }, {
            path: '/register',
            component: Register,
            children: [{//子路由
                path: '/register/tab1',
                component: Tab1
            }, {
                path: '/register/tab2',
                component: Tab2
            }]
        }]
    })
    const vm = new Vue({
        el: '#app',//挂载到id为app上 元素的挂载位置 把数据关联到页面中的某个标签里
        data: {//模型数据 对象

        },
        methods: {

        },
        // 挂载实例对象
        router

    })
</script>

</html>
```

![image-20200731083630347](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731083630347.png)

![image-20200731084628744](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731084628744.png)

![image-20200731084639419](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731084639419.png)

![image-20200731085013795](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731085013795.png)

![image-20200731093524074](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731093524074.png)

![image-20200731093532538](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731093532538.png)

![image-20200731094219823](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731094219823.png)

- 路由案例

  ![image-20200731112744110](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731112744110.png)

##### 前端工程化

![image-20200731125103446](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731125103446.png)

![image-20200731125119108](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731125119108.png)

![image-20200731130928954](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731130928954.png)

![image-20200731133614480](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731133614480.png)

- webpack
- ![image-20200731133937960](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731133937960.png)

![image-20200731134054894](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731134054894.png)

![image-20200731134244721](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731134244721.png)

![image-20200731135747282](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731135747282.png)

![image-20200731175313708](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731175313708.png)

![image-20200731180003031](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731180003031.png)

![image-20200731181052089](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731181052089.png)

![image-20200731181837018](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731181837018.png)

![image-20200731182128542](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731182128542.png)

![image-20200731182143582](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731182143582.png)

![image-20200731182854428](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731182854428.png)

![image-20200731183304880](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731183304880.png)

![image-20200731183656637](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731183656637.png)

![image-20200731184511981](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731184511981.png)

![image-20200731185823889](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731185823889.png)

![image-20200731190650999](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731190650999.png)

![image-20200731192251686](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731192251686.png)

![image-20200731192812410](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731192812410.png)

![image-20200731193413898](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731193413898.png)

##### vue-cli创建项目

![image-20200731195056089](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731195056089.png)

![image-20200731195500925](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731195500925.png)

![image-20200731203643810](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731203643810.png)

![image-20200731203728469](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731203728469.png)

##### element-ui

![image-20200731204249461](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731204249461.png)

![image-20200731205534409](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731205534409.png)

### 2.项目电商后台管理

![image-20200731232451121](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200731232451121.png)

![image-20200801110501106](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200801110501106.png)

![image-20200801120014295](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200801120014295.png)

![image-20200801220050738](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200801220050738.png)

![image-20200801220940209](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20200801220940209.png)