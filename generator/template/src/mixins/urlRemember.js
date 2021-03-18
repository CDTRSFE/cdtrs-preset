// 文档请查看 README.md
export default {
    data() {
        return {
            ignoreDefaultParams: null,
        };
    },
    created() {
        this.restoreParamsFromUrl();
        this.watchUrlRememberParams();
    },
    computed: {
    // 将简写的rule进行格式化
        formatedRemUrlRules() {
            return this.urlRemember.rules.map(item => {
                return typeof item === 'string'
                    ? {
                        name: item,
                    }
                    : item;
            });
        },
    },
    watch: {
        $route: function() {
            if (!this.$route.params.urlRememberRecord) {
                this.restoreParamsFromUrl();
            }
        },
    },
    methods: {
    // 从URL还原参数
        restoreParamsFromUrl() {
            this.formatedRemUrlRules.forEach(item => {
                const queryValue = this.$route.query[item.name];
                if (queryValue !== undefined) {
                    this[this.urlRemember.key][item.name] = item.restore ? item.restore(queryValue) : queryValue;
                } else {
                    if (item.default && (!item.ignore_default || this.$route.query[item.ignore_default] === undefined)) {
                        this[this.urlRemember.key][item.name] = item.default;
                    }
                }

                const ignoreValue = {};
                if (item.ignore_default) {
                    ignoreValue[item.ignore_default] = !!this.$route.query[item.ignore_default];
                }
                this.ignoreDefaultParams = ignoreValue;
            });
        },

        // 对Params中的每个字段或者整个参数进行监听，进行跳转
        watchUrlRememberParams() {
            let watchVal = this.urlRemember.watch;
            if (watchVal === undefined) watchVal = 'deep';
            if (!watchVal) return;

            if (watchVal === 'deep') {
                this.formatedRemUrlRules.forEach(item => {
                    this.$watch(`${this.urlRemember.key}.${item.name}`, () => {
                        const defaultKey = item.ignore_default;
                        if (defaultKey) {
                            this.ignoreDefaultParams[defaultKey] = true;
                        }
                        this.gotoRouteByUrlRemember();
                    });
                });
            } else {
                this.$watch(`${this.urlRemember.key}`, () => {
                    this.gotoRouteByUrlRemember();
                });
            }
        },

        // 跳转
        gotoRouteByUrlRemember() {
            this.$router.push({
                name: this.$router.name,
                query: this.storeUrlQueryFromParams(),
                params: {
                    // 加这个参数是为了区分由记忆触发的跳转（已经改变过params无需再改变）还是其它手动跳转（同一个页面不同参数）
                    urlRememberRecord: true,
                },
            }).catch(() => {});
        },

        // 跳转之前组装URL参数
        storeUrlQueryFromParams() {
            const params = this[this.urlRemember.key];
            const ignoreParams = Object.keys(this.ignoreDefaultParams).filter(key => this.ignoreDefaultParams[key]).reduce((result, key) => {
                result[key] = true;
                return result;
            }, {});
            return this.formatedRemUrlRules.reduce((result, item) => {
                if (params[item.name] !== undefined && params[item.name] !== null && params[item.name] !== '' && params[item.name] !== item.default) {
                    result[item.name] = params[item.name];
                }
                return result;
            }, ignoreParams);
        },
    },
};
