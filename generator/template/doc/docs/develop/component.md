## 两大组件库

为了适应ui的设计要求和满足用户使用习惯，这个项目同时使用了两大组件库,分别是是[vuetify](https://v2.vuetifyjs.com/zh-Hans/components/selects/)组件库和[element-ui](https://element.eleme.cn/#/zh-CN)组件库。

## 组件库的引用方式

由于是基于两个ui框架来进行项目的构建，所以为了不造成项目的体积过大，我们在对两种组件的引入上采用了不同的引入方式。

1. 对于vuetify，因为是项目最基础的组件，所以采用的是全局引入，在main.js文件下。

```js
import vuetify from './plugins/vuetify';
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
}).$mount('#app');
```
2.对于element-ui来说，我们只会用到一些特殊的组件，所以采用的是按需引入方式。在plugins/element.js路径下

```js
import Vue from 'vue';
import {
    Button,
    Select,
    DatePicker,
    ...
    ...
}
import '../scss/element-variables.scss';
Vue.use(Button);
Vue.use(Select);
Vue.use(DatePicker);
```
## 组件的选择原则以及使用方式

这个项目是同时使用了vuetify和element-ui两大组件库,但因为vuetify在某些方面的优点，例如生态环境相对于element-ui来说更好一点，所以本项目最主要的ui框架还是vuetify，只有在为了适应和满足某些特殊情况，比如时间选择器的以及表格组件的使用，才会去使用element-ui组件来更好的满足用户的使用和呈现出更好的效果。

1. vuetify组件的使用，以按钮为例。

```js
<v-btn  dark tile depressed>
    ...
</v-btn>
```
2. element-ui组件的使用，以表格为例(前提是已经先按需引入所需要使用的组件)。

```js
<el-table v-loading>
    <el-table-column>
    </el-table-column>
    ...
</el-table>
```
## 团队内部封装的组件

为了适应ui风格以及用户的使用习惯，同时也为了方便团队内部更好、更快的进行开发，团队内部在基于vuetify和element-ui的基础上，自己封装了一些组件。

* 分页组件：TrsPagination，路径：src/components/common/TrsPagination。使用方式：

    ```js
    <TrsPagination currentpage.sync="5" length="10" page-size.sync="10" total="100"></TrsPagination>
    ```

## 注意事项

* 对于团队内部封装的组件，如果是那种基础化的、适用面积很广的组件，比如分页、取稿等类似的组件，应该是放在 src/components/common或者src/components/normal路径下。而对于那种适用于某一两个地方，不具有基础性的组件，类似于数字报的数据展示组件PicList，就应该单独的放在数字报所对应的components文件夹下。
