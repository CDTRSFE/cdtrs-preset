/*
 * @Description: 全局过滤器
 * @Date: 2020-03-19 15:25:13
 */
import Vue from 'vue';
const dayjs = require('dayjs');

const filters = {
    /**
     * 日期过滤
     * @param {日期} date
     * @param {*日期格式} fmt
     */
    formatdate(date, fmt = 'YYYY-MM-DD') {
        return dayjs(date).isValid() ? dayjs(date).format(fmt) : '';
    },
};
/**
 * 循环遍历全局注册过滤器
 */
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
