由于需要借助提交自动生成changelog，所以需要在我们每次提交写提交信息的时候需要遵循如下的规范：

- 有JIRA号的，尽量加上JIRA号（写到scope change中）
- 描述清楚本次提交做了什么，不要简单地复制JIRA描述
- 只有feat和fix的提交会记录到changelog中，所以应该判断自己的提交为哪种类型，是否应该加入changlog
- 记录到changelog中的提交尽量跟业务相关，如代码架构上的优化就不要提交为这两种类型了
- break change 也会记录到changelog中，一般不要勾选这个
- 尽量少用优化类的字眼，把描述细化到具体做了什么事