import $ from 'jquery'
import './css/1.css'
import './css/1.less'
import './css/1.scss'
// import App from './components/App.vue'
$(function(){
    $('li:odd').css('backgroundColor','red')
    $('li:even').css('backgroundColor','lightblue')
})
class Person{
    static info="aaa"
}
console.log(Person.info)

//-------------------
import Vue from 'vue'//导入Vue构造函数

import App from './components/App.vue'//导入App根组件

const vm = new Vue({
    el:'#app',
    // 通过render函数 将指定的组件渲染到el区域中
    render:h=>h(App)
})