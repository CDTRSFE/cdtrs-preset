const sidebar = require('./sidebar');
module.exports = {
    title: '文档',
    themeConfig: {
        nav: [
            { text: '拓尔思官网', link: 'http://www.trs.com.cn/' },
        ],
        sidebar: sidebar,
        lastUpdated: 'Last Updated',
    },
    plugins: [
        '@vuepress/medium-zoom',
        'demo-code',
    ],
};
