// 提供某些组件的通用样式属性

import Vue from 'vue';

Vue.use({
    install: function(Vue) {
        Vue.prototype.$theme = {
            // 通用文本框样式
            input: {
                dense: true,
                outlined: true,
                color: 'primary',
                class: 'body-2',
                height: '30px',
            },
            tableHeaderCellStyle: {
                'background-color': '#F6F5F8',
                color: '#2a2a2a',
                'font-size': '16px',
            },
        };
    },
});
