import router from './router';
import store from './store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
    // 路由进度条开始
    NProgress.start();
    next();
});

router.afterEach(() => {
    // 结束progress
    NProgress.done();
});
