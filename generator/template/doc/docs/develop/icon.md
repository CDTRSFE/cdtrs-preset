## 图标库说明

项目主要使用到了以下图标库

- [Materia Icons](https://materialdesignicons.com/)

## 使用 Materia Icons 的目的

Material design至发布以来，已然形成了其鲜明的设计风格。其具有的设计语言规范被很多平台使用，所以具有很高的规范性。并且相比较以前需要用到图标的时候就要下载该图标的方式，`Materia Icons`
只用按需引入用到的图标的名称，极大地方便了我们的开发和维护。

## 安装方式

安装`@mdi/js`

```js
npm install @mdi/js
```

## 引入方式

将`mdi+图标名` 写进 `netsource\netresource\src\plugins\icon.js`中先进行引入：

```js
import {
    mdiPlus,
    mdiSinaWeibo,
    mdiWechat,
} from '@mdi/js';
```
再进行注册：

```js
Vue.use({
    install: function(Vue) {
        Vue.prototype.$icon = {
            mdiPlus,
            mdiSinaWeibo,
            mdiWechat,
        };
    }
});
```
做完这两步，需要用到的图标就完成了注册，马上就可以使用了。

## 使用举例

如以上步骤中已完成注册的`mdiPlus`图标举例，已经完成了在``icon.js`中的注册，接下来需要在要用的地方使用插值的方式引入：

```html
<v-icon :size="minFontSize" @click="minus">{{ $icon.mdiPlus }}</v-icon>
```
