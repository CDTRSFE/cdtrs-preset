import Vue from 'vue';
import VueRouter from 'vue-router';
import goTo from 'vuetify/es5/services/goto';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Index'),
    },
];

const router = new VueRouter({
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0;
        if (to.hash) {
            scrollTo = to.hash;
        } else if (savedPosition) {
            scrollTo = savedPosition.y;
        }
        return goTo(scrollTo);
    },
    routes,
});

// 本地记录某些URL地址
router.afterEach(to => {
    const urls = Vue.prototype.$localstore.get('urlhistory') || {};
    urls[to.name] = to.fullPath;
    Vue.prototype.$localstore.set('urlhistory', urls);
});

// 将URL变化映射到iframe上
router.afterEach(to => {
    window.parent.postMessage(JSON.stringify({
        from: 'net',
        action: 'navigate',
        data: {
            module: 'net',
            path: to.fullPath,
        },
    }), '*');
});

export default router;
