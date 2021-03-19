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

export default router;
