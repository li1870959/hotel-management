import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: () => import('@/views/login'),
            meta: { title: '登录' }
        },
        {
            path: '/',
            component: () => import('@/layout'),
            meta: { title: 'Home' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import('@/views/dashboard'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/checkin',
                    component: () => import('@/views/checkin'),
                    meta: { title: '入住信息' }
                },
                {
                    path: '/employee',
                    component: () => import('@/views/employee'),
                    meta: { title: '员工管理' }
                },
                {
                    path: '/roomservice',
                    component: () => import('@/views/roomservice'),
                    meta: { title: '客户服务' }
                },
                {
                    path: '/room',
                    component: () => import('@/views/room'),
                    meta: { title: '客房管理' }
                },
                {
                    path: '/searchroom',
                    component: () => import('@/views/searchroom'),
                    meta: { title: '客房查询' }
                },
                {
                    path: '/checkout',
                    component: () => import('@/views/checkout'),
                    meta: { title: '退房记录' }
                },
                ,
                {
                    path: '/finance',
                    component: () => import('@/views/finance'),
                    meta: { title: '财务管理' }
                },
                {
                    path: '/updatePwd',
                    component: () => import('@/views/updatePwd'),
                    meta: { title: '修改密码' }
                }
            ]
        },

        {
            path: '*',
            redirect: '/404'
        }
    ]
});
