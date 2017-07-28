// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

//注册一个全局自定义指令 v-focus
Vue.directive('focus',{
    inserted:((el) => {
        el.focus()
    })
})

Vue.use(ElementUI)

//导入公共样式
require("./assets/css/common.less")

//定义全局axios
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://node.chezhentong.com/api/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
