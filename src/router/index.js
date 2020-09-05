import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: resolve => (require(['../views/home.vue'], resolve)),
        name: 'home'
    }, {
        path: '/classDetails',
        component: resolve => (require(['../views/classDetails.vue'], resolve)),
        name: 'classDetails'
    }, {
        path: '/teacherDetails',
        component: resolve => (require(['../views/teacherDetails.vue'], resolve)),
        name: 'teacherDetails'
    }, {
        path: '/investment',
        component: resolve => (require(['../views/investment.vue'], resolve)),
        name: 'investment'
    }, {
        path: '/advertising',
        component: resolve => (require(['../views/advertising.vue'], resolve)),
        name: 'advertising'
    }, {
        path: '/advertisingDetail',
        component: resolve => (require(['../views/advertisingDetail.vue'], resolve)),
        name: 'advertisingDetail'
    }]
})