import Vue from 'vue';

Vue.use({
    install: function(Vue) {
        Vue.prototype.$auth = function(powers) {
            if (typeof powers === 'string') {
                powers = [powers];
            }

            powers = powers || [];

            return !!powers.find(item => this.$store.state.session.auths.indexOf(item) > -1);
        };

        // 跳转到登录页面
        Vue.prototype.$gotologin = function(url) {
            url = url || '/#/login';
            const isProd = process.env.NODE_ENV === 'production';
            const loginURL = (isProd ? url : null) || '/#/login';
            window.location.href = loginURL;
        };
    },
});
