// 互联网和专网端进行融合
import Vue from 'vue';
Vue.use({
    install: function(Vue) {
    // 当前端是否是互联网端
        Vue.prototype.$isInterClient = function() {
            return (window.APPCONF || {}).client === 'internet';
        };
        Vue.prototype.$clientName = function() {
            return this.$isInterClient() ? '互联网端' : '专网端';
        };
    },
});
