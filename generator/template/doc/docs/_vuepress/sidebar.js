module.exports = [{
    title: '开发文档',
    path: '/',
    collapsable: false,
    sidebarDepth: 2,
    children: [
        {
            title: '关于',
            path: '/about/',
            collapsable: false,
            sidebarDepth: 2,
            children: [
                {
                    title: '环境/账号',
                    path: '/about/envs',
                    collapsable: false,
                    sidebarDepth: 2,
                },
                {
                    title: '技术/框架',
                    path: '/about/skill',
                    collapsable: false,
                    sidebarDepth: 2,
                },
                {
                    title: '重构说明',
                    path: '/about/restruct',
                    collapsable: false,
                    sidebarDepth: 2,
                },
            ],
        },
        {
            title: '开发',
            collapsable: false,
            children: [
                {
                    title: '连接VPN',
                    path: '/develop/vpn',
                    sidebarDepth: 2,
                },
                {
                    title: '启动项目',
                    path: '/develop/start',
                    sidebarDepth: 2,
                },
                {
                    title: '组件使用',
                    path: '/develop/component',
                    sidebarDepth: 2,
                },
                {
                    title: '路由记忆',
                    path: '/develop/urlremember',
                    sidebarDepth: 2,
                },
                {
                    title: '图标使用',
                    path: '/develop/icon',
                    sidebarDepth: 2,
                },
            ],
        },
        {
            title: '部署',
            collapsable: false,
            children: [
                {
                    title: '提交',
                    path: '/deploy/commit',
                    sidebarDepth: 2,
                },
                {
                    title: '发版',
                    path: '/deploy/version',
                    sidebarDepth: 2,
                },
            ],
        },
        {
            title: '功能',
            collapsable: false,
            children: [
                {
                    title: '报刊热点',
                    path: '/feature/newspaper',
                    sidebarDepth: 2,
                },
                {
                    title: '身份认证',
                    path: '/feature/authentication',
                    sidebarDepth: 2,
                },
            ],
        },
        {
            title: '规范',
            collapsable: false,
            children: [
                {
                    title: '开发规范',
                    path: '/standard/develop',
                    sidebarDepth: 2,
                },
                {
                    title: '提交规范',
                    path: '/standard/commit',
                    sidebarDepth: 2,
                },
            ],
        },
    ],
}];
