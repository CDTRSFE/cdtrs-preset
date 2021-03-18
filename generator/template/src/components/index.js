/*
 * @Description: 公共组件配置入口
 * @Date: 2020-03-19 15:24:08
 */
import Vue from 'vue';
const files = require.context('./common', true, /\.vue$/);
const requireAll = context => context.keys().map(context);
requireAll(files).forEach(({ default: item }) => {
    Vue.component(item.name, item);
});
