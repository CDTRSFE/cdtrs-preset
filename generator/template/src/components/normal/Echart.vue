<template>
    <div ref="mychart" :style="{width: width, height: height}"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
} from 'echarts/components';
echarts.use([TooltipComponent],
);
let resizeTimer;
export default {
    name: 'Echart',
    props: {
        options: {
            type: Object,
            required: true,
            default: () => null,
        },
        map: {
            type: String,
            default: null,
        },
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: '100%',
        },
        /** 是否不跟之前设置的 option 进行合并，默认为 false，即合并。 */
        notMerge: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            myChart: null,
        };
    },
    watch: {
        options: {
            handler: function() {
                this.drawChart();
            },
            deep: true,
        },
    },
    mounted() {
        this.drawChart();
        window.addEventListener('resize', this.resizeHandler);
    },
    destroy() {
        if (this.myChart) {
            window.removeEventListener('resize', this.resizeHandler);
            this.myChart.dispose();
            this.myChart = null;
        }
    },
    methods: {
        // 开始画图
        async drawChart() {
            if (!this.options) return;
            if (this.map) {
                const mapData = require(`@/assets/maps/${this.map}.json`);
                echarts.registerMap(this.map, mapData);
            }
            this.myChart = echarts.init(this.$refs.mychart);
            this.myChart.setOption(this.options, this.notMerge);
        },

        // 窗口重置
        resizeHandler() {
            resizeTimer = setTimeout(() => {
                clearInterval(resizeTimer);
                this.myChart.resize();
            }, 500);
        },
    },
};
</script>
