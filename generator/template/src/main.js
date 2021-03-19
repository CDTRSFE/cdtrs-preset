/*
 * @Description: 主入口文件
 * @Date: 2020-03-19 15:19:32
 */
import Vue from 'vue';
import './plugins/axios';
import './plugins/filters';
import './plugins/directives';
import './plugins/eventbus';
import './plugins/print';
import './plugins/message';
import './plugins/theme';
import './plugins/localstore';
import './plugins/stop_list_group';
import './plugins/scrolltop';
import './plugins/token';

import App from './App.vue';
import router from './router';

// 小项目可不使用store，直接使用eventBus
import store from './store';
import './components/index';
import vuetify from './plugins/vuetify';
import './plugins/icon';
import './plugins/confirm';
import './plugins/element';
import Router from 'vue-router';
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch((error) => error);
};
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
