# vtris-preset

一个用于自动生成 Vue2 项目结构的 Vue CLI 4.x preset，包含了创建项目所需的大部分依赖项、配置文件、常用组件和插件等。

> 模板存放在 `/generator/template`，创建项目时自动生成，如果要调整模板需注意：空文件和文件夹会被忽略，模板要考虑[文件名的边界情况](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#%E6%96%87%E4%BB%B6%E5%90%8D%E7%9A%84%E8%BE%B9%E7%95%8C%E6%83%85%E5%86%B5)，以点开头的模板需要使用下划线取代那个点，以下划线开头的文件需要使用两个下划线来取代单个下划线。

## 使用

```shell
vue create --preset CDTRSFE/vtris-preset <app-name>
```

创建完成后目录结构

```
.
├── build
│   ├── changelog.config.js
│   ├── commit.hbs
│   └── dogit.config.js
├── commitlint.config.js
├── .eslintrc.js
├── .gitignore
├── src
│   ├── App.vue
│   ├── assets                      # 静态资源
│   │   ├── fonts                   # 字体文件
│   │   ├── images                  # 图片
│   │   ├── js                      # js文件或json资源
│   │   ├── maps                    # echarts的地图数据
│   │   │   ├── china.json
│   │   │   └── yunnan.json
│   │   └── styles
│   │       └── variable.less       # less变量
│   ├── components
│   │   ├── common                  # 全局公用组件，位于此目录下的组件会自动注册
│   │   │   ├── ConfirmBox.vue
│   │   │   ├── TrsFormItem.vue
│   │   │   ├── TrsPagination.vue
│   │   │   └── TrsUploader.vue
│   │   ├── index.js
│   │   └── normal                  # 全局公用组件，使用时需要手动引入
│   │       └── Echart.vue
│   ├── main.js
│   ├── mixins
│   │   └── urlRemember.js          # 路由记忆
│   ├── plugins
│   │   ├── auth.js
│   │   ├── axios.js
│   │   ├── confirm.js
│   │   ├── directives.js
│   │   ├── element.js
│   │   ├── eventbus.js
│   │   ├── filters.js              # 全局过滤器
│   │   ├── icon.js                 # 按需引入的 midSvg 图标
│   │   ├── localstore.js
│   │   ├── message.js
│   │   ├── print.js
│   │   ├── scrolltop.js            # 将某个容器元素的滚动条缓缓滚动到顶部
│   │   ├── stop_list_group.js
│   │   ├── theme.js                # 提供某些组件的通用样式属性
│   │   ├── token.js
│   │   ├── utils.js
│   │   └── vuetify.js
│   ├── router
│   │   └── index.js
│   ├── scss
│   │   ├── element-variables.scss  # element-ui 全局变量设置
│   │   ├── reset.scss
│   │   └── variables.scss          # 全局 scss 变量
│   ├── service
│   │   └── session.js
│   ├── store
│   │   ├── index.js
│   │   ├── modules
│   │   │   ├── session.js
│   │   │   └── stateStore.js
│   │   └── mutationTypes.js
│   └── views
│       └── home
│           └── Index.vue
└── stylelint.config.js
```

## 样式相关

* 在 `src/scss/element-variables.scss` 中重置 `element-ui` 的全局样式。

* 为了统一样式，使用全局变量，在 `src/scss/variables.scss` 中进行定义，已在`App.vue`中引入，页面中可以直接使用。

## 组件

公用组件请放在 `src/components/` 下，其中 `common/` 目录下存放的组件会自动全局注册，其他公用组件放在 `normal/` 里，使用时再引入。

已预置组件如下：

* `ConfirmBox.vue` —— 确认框，已在 `/src/plugins/confirm.js` 中注册，使用时直接调用 `this.$confirm`

* `TrsFormItem.vue` —— 表单项

* `TrsPagination.vue` —— 统一样式的分页组件

* `TrsUploader.vue` —— 文件上传组件

* `Echarts.vue` —— 对**echarts**进行封装的组件

## 指令

全局指令在 `src/plugins/directives.js` 的 `directives` 对象中定义。

已预置指令如下：

* `clickoutside` —— 点击元素以外，用于关闭菜单

## 过滤器

全局过滤器在 `src/plugins/filters.js` 的 `filters` 对象中定义。

已预置过滤器如下：

* `formatdate` —— 日期过滤

## Vuex

为了避免 store 对象变得臃肿，根据业务把 store 拆分成带命名空间的模块，所有模块放在 `src/store/modules/` 下，实例化 `vuex` 之前自动导入 `modules` 下的所有模块，并开启热更新。

## ESLint

所有自定义规则都放在了 [eslint-config-tpconfig](https://github.com/CDTRSFE/eslint-config-tpconfig) 里单独维护，创建项目后自动生成的 `.eslintrc.js` 文件里不再有 `rules`。在编辑器中，建议安装 [Eslint 插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)，并开启保存时自动修复。

```json
// vscode settings.json
{
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
}
```

## stylelint

所有自定义规则都放在了[stylelint-config-tpconfig](https://github.com/CDTRSFE/stylelint-config-tpconfig) 里单独维护，创建项目后自动生成的 `stylelint.config.js` 文件里不再有 `rules` 。在编辑器中，建议安装 [stylelint 插件](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)。并开启保存时自动修复。

```json
// vscode settings.json
{
    "editor.codeActionsOnSave": {
      "source.fixAll.stylelint": true
    }
}
```

## 版本控制

- [x] pre-commit 代码校验
- [x] commit message 格式校验

> 为了方便生成版本日志，提交代码时输入的 message 需要按照一定的[格式](https://www.conventionalcommits.org/en/v1.0.0/)，如 `feat(blog): add comment section`，可以使用 [`git cz`](https://github.com/commitizen/cz-cli) 代替 `git commit` 生成符合规范的 message。

如果要打tag：

```shell
npm run tag
```

如果要生成版本日志：

```shell
npm run changelog:prod # 生产环境的changelog
npm run changelog:test # 测试环境的changelog
```

## 相关链接

+ 更通用的vue-preset：[https://github.com/CDTRSFE/vue-preset](https://github.com/CDTRSFE/vue-preset)

+ Vue 项目规范文档: [https://wiki.trscd.com.cn/pages/viewpage.action?pageId=59900220](https://wiki.trscd.com.cn/pages/viewpage.action?pageId=59900220)

+ ESLint 配置: [https://github.com/CDTRSFE/eslint-config-tpconfig](https://github.com/CDTRSFE/eslint-config-tpconfig)

+ stylelint 配置: [https://github.com/CDTRSFE/stylelint-config-tpconfig](https://github.com/CDTRSFE/stylelint-config-tpconfig)
