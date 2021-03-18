import Vue from 'vue';

Vue.use({
    install: function(Vue) {
    // 将某个容器元素的滚动条缓缓滚动到顶部
        Vue.prototype.$scrollTop = (element, duration = 600) => {
            if (element.scrollTop === 0) return;
            const cosParameter = element.scrollTop / 2;
            let scrollCount = 0;
            let oldTimestamp = null;
            function step(newTimestamp) {
                if (oldTimestamp !== null) {
                    scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
                    if (scrollCount >= Math.PI) {
                        element.scrollTop = 0;
                        return;
                    }
                    element.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
                }
                oldTimestamp = newTimestamp;
                window.requestAnimationFrame(step);
            }
            window.requestAnimationFrame(step);
        };
    },
});
