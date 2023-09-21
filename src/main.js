import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';

import '@/styles/index.less'; // 全局css
import '@/assets/css/main.less'; //页面css

import '@/assets/css/theme-default/index.css'; // 默认主题
import '@/assets/css/theme-green/index.css'; // 绿色主题
import '@/assets/css/theme-purple/index.css'; //紫色主题

import 'babel-polyfill';
import store from '@/store';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'mini'
});

import './permission'; // 路由渲染，进度条，权限控制
import './icons'; // icon

const { mockXHR } = require('../mock');
mockXHR();

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | HotelManagement`;
//     const role = localStorage.getItem('ms_username');
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     } else {
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         } else {
//             next();
//         }
//     }
// });

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
});
