## 目的

页面中的某些参数，例如日期时间、页码、选项卡的当前选项等，需要在刷新（或者在别处打开）时和当前一致，实现类似记忆的效果。

## 原理

* 初始化时**从路由读取数据还原参数**，然后对需要监听的对象添加监听器

* 当**监听的对象变化**时，触发监听器，使用`$router.push`方法，将数据转换后保存到`query`进行**路由跳转**

* **监听路由**的变化，触发后**从路由读取数据改变参数**

> 实现了路由记忆和业务逻辑解耦，无论是否使用路由记忆，业务逻辑都不受影响。

## 使用

1. 在需要进行记忆的组件中引入 `UrlRememberMixin`

```js
import UrlRememberMixin from '@/mixins/urlRemember';
export default {
  mixins: [UrlRememberMixin]
  ...
}
```

2. 在 data 中加入 `urlRemember` 字段，格式为

```js
export default {
   data() {
      return {
        urlRemember: {
          key: 'params',
          watch: 'deep',
          rules: ['mediaType', 'startTime', 'endTime', 'keywords', 'type', {
              name: 'page',
              default: 1,
              restore: val => parseInt(val || 1)
          }]
        }
      }
   }
}

```

### `urlRemember`参数说明

* `key` 表示要记录的参数对象名

* `watch` 表示是否监听params的变化自动跳转(改变url参数值)
  - `deep` 默认值，表示监听到params里面的任何一个字段变化的时候就跳转
  - `whole` 表示监听到整个parmas对象的变化才跳转，一般用于存在多个不会及时触发变化的参数，需要通过手动点击类似搜索的按钮才触发请求的场景。
  - `false` 表示不监听params，整个时候想要跳转的话必须手动跳转

* `rules` 定义要记录的参数字段，字符串形式表示字段，对象形式则为

```js
{
    name: 'page',
    default: 1,
    restore: val => parseInt(val || 1)
}
```

这里的 `default` 表示该参数的默认值，在组装URL参数跳转的时候，如果发现该参数的值等于默认值，则不会将其加入到URL参数中。`restore` 为回填处理函数，对于某些参数，比如 `page` 页码，在URL中为字符串，但是我们回填到 `params` 中必须为数字，这个时候就需要通过这个函数做一些处理转换工作了。

### 手动跳转

```js
this.gotoRouteByUrlRemember()
```

## 注意事项

* 如果需要监听被url记忆的参数，不要直接在 `watch` 中进行监听，使用 `this.$watch` 在 `created` 阶段进行动态添加。
