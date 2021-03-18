import Vue from 'vue';
import vuetify from './vuetify';
import Confirm from '@/components/common/ConfirmBox';
const ConfirmBox = Vue.extend(Confirm);

Vue.use({
    install: function(Vue) {
        Vue.prototype.$confirm = (title, content) => {
            const instance = new ConfirmBox({
                data: {
                    title: title,
                    content: content,
                },
                vuetify,
            }).$mount();
            document.getElementById('app').appendChild(instance.$el);
            return instance.confirm();
        };
    },
});
