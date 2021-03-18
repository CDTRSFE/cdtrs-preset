import Vue from 'vue';
const store = require('store');
const expirePlugin = require('store/plugins/expire');
store.addPlugin(expirePlugin);

const formatKey = key => {
    return `netrs.${key}`;
};

Vue.use({
    install: function(Vue) {
        Vue.prototype.$localstore = {
            set(key, val, expire) { // expire 过期时间  单位：秒
                if (expire) {
                    store.set(formatKey(key), val, new Date().getTime() + 1000 * expire);
                } else {
                    store.set(formatKey(key), val);
                }
            },
            get(key) {
                return store.get(formatKey(key));
            },
        };
    },
});
