# 提交

## 提交前代码格式检查

```shell
npm run stylelint
```

## 安装格式化提交信息工具

> `commitizen` 用来帮助我们格式化提交信息


全局安装 ([https://github.com/commitizen/cz-cli](https://github.com/commitizen/cz-cli))

```shell
npm install -g commitizen
```

## 使用 `git cz` 代替 `git commit`

根据提示信息填写，并遵循[提交规范](/standard/commit)。

> 到这里，提交需要执行的操作就完成了，下面是项目中提交相关工具的配置介绍。

--------------------------------------------------

## 格式化提交信息工具配置介绍

在在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式。

```shell
commitizen init cz-conventional-changelog --save-dev --save-exact
```

如果执行失败则可以分开执行

```shell
npm install --save-dev cz-conventional-changelog
```

在 package.json 中加入
```
"config": {
  "commitizen": {
    "path": "cz-conventional-changelog"
  }
}
```

## 提交信息格式检测配置介绍

1. 安装 `husky`

```shell
npm install --save-dev husky
```

2. 安装并初始化 `commitlint` ([https://commitlint.js.org/](https://commitlint.js.org/))

```shell
npm install --save-dev @commitlint/{cli,config-conventional}
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```

3. 在 `package.json` 中新增如下配置

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

## 生成提交历史配置介绍


1. 安装 [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)

```shell
npm install -g conventional-changelog-cli
```

2. 生成正式版log

```shell
conventional-changelog -t xjzmy-prod- -n changelog.config.js -p angular -i version.readme.md -s -r 0 && autocpo -m 'docs: 生成changelog' -f version.readme.md
```

3. 生成测试版log

```shell
conventional-changelog -t xjzmy-test- -n changelog.config.js -p angular -i version.test.readme.md -s -r 0 && autocpo -m 'docs: 生成changelog' -f version.test.readme.md
```

4. 为了方便使用，将其写入package.json的scripts字段

```json
{
  "scripts": {
    "changelog": "conventional-changelog -t xjzmy-prod- -n changelog.config.js -p angular -i version.readme.md -s -r 0 && autocpo -m 'docs: 生成changelog' -f version.readme.md",
    "changelog:test": "conventional-changelog -t xjzmy-test- -n changelog.config.js -p angular -i version.test.readme.md -s -r 0 && autocpo -m 'docs: 生成changelog' -f version.test.readme.md"
  }
}
```

:::tip
conventional-changelog 只会生成  "Feature", "Fix", "Performance Improvement" or "Breaking Changes" 这些提交类型
:::
