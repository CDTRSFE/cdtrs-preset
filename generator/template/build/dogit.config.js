module.exports = {
    flow: {
        plugin: 'AddTag',
        option: {
            envs: {
                dev: {
                    prefix: 'xjzmy-dev-v',
                },
                test: {
                    prefix: 'xjzmy-test-v',
                },
                prod: {
                    prefix: 'xjzmy-prod-v',
                },
            },
        },
        hook: {
            before: [
                {
                    plugin: 'ReplaceFile',
                    option: {
                        path: './build/version.js',
                        replace: "module.exports = { version: '__$tag__' }",
                    },
                },
                {
                    plugin: 'ReplaceFile',
                    option: {
                        path: './public/app.config.js',
                        replace: (content, params) => {
                            return content.replace(/(version:\s+)'[\w\.\d-]+'/g, `$1'${params.tag}'`);
                        },
                    },
                },
                {
                    command: 'npm run changelog:__$env__',
                    when: params => {
                        return params.env !== 'dev';
                    },
                },
                {
                    plugin: 'GitCommit',
                    option: {
                        message: 'docs: 环境生成changelog并替换版本号',
                    },
                },
            ],
        },
    },
};
