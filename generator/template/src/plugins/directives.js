/*
 * @Description: 全局指令
 * @Date: 2020-03-19 15:25:06
 */
import Vue from 'vue';
const directives = {
    /**
     * @description:点击元素以外，用于关闭菜单
     * @param {type}
     * @return:
     */
    clickoutside: {
        bind: function(el, binding) {
            function documentHandler(e) {
                if (el.contains(e.target)) {
                    return false;
                }
                if (binding.expression) {
                    binding.value(e);
                }
            }
            el._vueClickOutside_ = documentHandler;
            document.addEventListener('click', documentHandler);
        },
        unbind: function(el) {
            document.removeEventListener('click', el._vueClickOutside_);
            delete el._vueClickOutside_;
        },
    },
};
/**
 * 循环遍历全局注册指令
 */
Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key]);
});
