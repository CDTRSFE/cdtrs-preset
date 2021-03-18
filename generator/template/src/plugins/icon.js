import Vue from 'vue';
import {
    mdiPlus,
} from '@mdi/js';

Vue.use({
    install: function(Vue) {
        Vue.prototype.$icon = {
            mdiPlus,
        };
    },
});
