import Vue from 'vue';
import {
    Message,
} from 'element-ui';

Vue.use({
    install: function(Vue) {
        Vue.prototype.$message = (type, content, delay = 2000) => {
            const messagebox = Message({
                message: content,
                type: type,
                duration: delay,
            });
            // 解决当把鼠标移动消息框上的时候就一直不会消失
            setTimeout(() => {
                messagebox.close();
            }, delay);
        };
    },
});
