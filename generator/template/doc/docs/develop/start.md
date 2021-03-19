## 项目的启动

目前项目的发版是基于 `develop` 分支进行发版的，所以 develop 是稳定版本的最新的代码。在开始一个新的功能或bug修复任务之前，需要将最新的`develop` 代码同步到本地，保证本地的 develop 是最新的

```bash
git fetch origin develop:develop
```

然后基于 `develop` 切出一个自己的功能分支出来

```bash
git checkout develop
git checkout -b feature/xxxx
```

如果是第一次运行项目请安装相关依赖

```bash
npm install
```

::: warning 
请勿使用 `cnpm` 安装依赖，必须用 `npm install`, 否则将不能兼容IE11。
:::

然后启动开发服务器

```bash
npm run serve
```

接着在浏览器中打开 [http://localhost:8090/](http://localhost:8090/) 即可

::: warning
注意如果你习惯访问 `http://127.0.0.1:8090/` 因为未登录情况下会跳转到第三方登录页面，对方会对来源域名进行验证，`127.0.0.1` 未在其白名单中就会报错，这个时候需要再次访问 `http://127.0.0.1:8090` 即可进入已登录状态。
:::


> 可以直接到 `package.json` 文件下查看其他的命令(比如 `style-lint` 等命令)

## 文档查看

进入到 doc目录下，然后进行依赖的安装，执行 npm run dev，即可进行项目文档的查看。
