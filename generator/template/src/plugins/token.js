import Vue from 'vue';
import { fetchToken } from '../service/session';
Vue.use({
    install: function(Vue) {
        Vue.prototype.$token = async function() {
            let token = this.$localstore.get('token');
            if (!token) {
                await fetchToken.call(this);
                token = this.$localstore.get('token');
            }
            return token;
        };
    },
});
