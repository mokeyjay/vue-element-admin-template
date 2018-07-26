# 基于Vue+Element的简单管理后台模板

## 简介
这是一款基于 `Vue / Vuex / VueRouter / axios / ElementUI` 等等而成的简单管理后台模板  
象征着本萌新终于跨入前端界了🎉  
得益于webpack的`externals`特性，大部分资源都采用CDN分发，使得构建完毕后仅占不到70K  
萌新的第一个作品，代码稀烂，请轻喷。如能提出建设性建议则十分感谢  

## 预览
### 登陆界面
![](https://ws1.sinaimg.cn/large/647b8589gy1ftndzqepcwj21hc0qvx6p.jpg)
### 首页
![](https://ws1.sinaimg.cn/large/647b8589gy1ftndzq4c51j21hc0qxjry.jpg)

## 特性
- 多标签页
- 二级导航菜单
- 轻量级表格导出
- 集成UEditor
- 集成一些小组件，内有示例

## 开发 & 构建
绝大部分配置项都在 `main.js` 里了，根据自己需求改就行  
导航菜单在 `src/router/router.js` 内配置  

```bash
yarn
# dev
yarn dev

# or build
yarn build
```

## 鸣谢
感谢以下小众但对本项目起到帮助的repo
- [vue-ueditor-wrap](https://github.com/HaoChuan9421/vue-ueditor-wrap)
- [vue-json-excel](https://github.com/jecovier/vue-json-excel)

## 其他
这个开源项目提取自最近的一个正式项目  
懒癌发作懒得写详细文档  
<del>反正代码稀烂也不会有除我之外的人用的</del>  