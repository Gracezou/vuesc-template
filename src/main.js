import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import config from './common/config'

//UI 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

//动态配置后台服务器地址
;(function() {
    axios.defaults.withCredentials = true
    axios.get('./baseUrl.json').then(res => {
        Vue.config.productionTip = false
        config.setBase(res.data.baseUrl)
        Vue.use(ElementUI)
        new Vue({
            router,
            render: h => h(App)
        }).$mount('#app')
    })
})()
