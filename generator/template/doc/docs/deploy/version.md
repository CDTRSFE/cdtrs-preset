# 发版说明

当我们对当前的版本进行一定的修改(例如新增功能、bug 修改等)之后，我们需要发布一个新的版本，将新的版本发布到对应的环境中。

## 发版工具说明

在本项目中，发版采用的是团队开发的发版工具[trs-tag](https://www.npmjs.com/package/trs-tag)。

## 发版号格式说明

发版号采用统一格式 `'xjzmy-env-version'` ，以 `xjzmy` 开头, `env`代表要发版环境，`version`代表版本号。 完整发版号举例：' xjzmy-test-v0.2.2'。

-   ### 环境说明
::: tip 
正式环境：prod  
测试环境：test  
生产环境：dev
:::

## 发版步骤

### 一、工具安装

全局安装工具：执行`npm install trs-tag -g`命令全局安装 trs-tag 工具。

### 二、初始化配置文件  

执行命令`gt init`生成配置文件`.trs-tagrc ` 
在配置.trs-tagrc 文件中，配置如下内容：  
``` json
{
"envs" : {
    "dev": "xjzmy-dev-v",
    "test": "xjzmy-test-v",
    "prod": "xjzmy-prod-v",
},
"beforeTag": "",
"afterTag": "",
"versionFile": [
    {
        "path":"public/app.config.js",
        "reg":"(version:\\s+)'[\\w\\.\\d-]+'",
        "replace":"$1'__VERSION__'"
    }
],
"versionCommitMsg": "docs: 全局版本号更新"
}

```  
参数解析参考[trs-tag](https://www.npmjs.com/package/trs-tag)中的配置项。

### 三、生成版本(tag)并提交到远端
执行`gt tag -s`，选择打tag环境。

![](./assets/selectenv.png)    
输入版本号。（默认在上个版本号后++，例如上个版本为0.0.1，此次版本号为：0.0.2）  

![](./assets/inputtag.png)  
根据提示输入信息，完成版本提交。  
![](./assets/success.png)  
## 全局版本号

在项目中经常会遇到各种提出来的BUG需要去修复，然而在项目中经常是边修改BUG边进行一些别的开发，因此在解决某个BUG之前，我们需要先进行版本的确认，这样才能定位好问题再去解决。为了能很直观的确认版本，我们在项目中设置了全局版本号，并在控制台打印。效果如下：  
![](./assets/version.png)  
### 文件配置  
在public下创建app.config.js，并在其中配置如下代码：
``` json
window.APPConfig = {
    version: 'xjzmy-tesr-v0.1.1'
};
```
配置此文件是用来存储版本号，在页面上获取版本号，并打印。该文件的地址要配置到上述的`.trs-tagrc`配置文件中,在trs-tag工具生成版本号时，会根据上述的配置文件，替换掉此文件中version后面的版本号。  
创建并配置好app.config.js文件之后，在public下的inedx.html中引入该js,并在控制台中打印，以实现效果。
``` js
    <script src="./app.config.js"></script>
    <script>
        console.log('\r\n' + '%c 当前运行的版本号 : %c ' + window.APPConfig.version + '\r\n', 'background: #606060; color: #fff; border-radius: 3px 0 0 3px;', 'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;')
    </script>
```  
  

