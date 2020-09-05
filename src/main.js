// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import { Button, Navbar, TabItem } from 'mint-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './styles/index.less'
import App from './App.vue'
import router from './router'
import '@/icons'
// import 'lib-flexible/flexible'
import Bridge from './utils/bridge.js'

// 解决移动端点击300ms延迟
import FastClick from 'fastclick'
import axios from './utils/request'
Vue.use(MintUI);
// Vue.component(Button.name, Button);
// Vue.component(Navbar.name, Navbar);
// Vue.component(TabItem.name, TabItem);
Vue.prototype.$http = axios

Vue.prototype.$bridge = Bridge

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
