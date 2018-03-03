## React-Cnode

> react web app, api 由 **cnode社区** 提供，欢迎大家star和fork

###  技术栈
react + react-router + axios + mobx + mobx-react + antd-mobile

###  demo
[live demo](http://119.29.12.21:3000)（兼容性，已经尽量去兼容了，如果有问题见谅）<br/>
![images](https://user-images.githubusercontent.com/23744602/31574427-40b147f2-b102-11e7-8731-253ab286dc37.gif)


## 目录结构
```
react-cnode/
   |
   ├──icons/                    * 用到的icon
   |
   ├──components/               * 可复用组件
   │
   │──pages/                    * 展示的页面
   |
   ├──store/                    * mobx
   │
   ├──router                    * 路由
   |
   ├──routes/                   * 路由的配置，动态加载
   │
   │──axios/                    * axios的配置文件
   │
   │──utils/                    * 工具函数
   │    |
   |    |—— db.js               * localstorage操作
   |    |
   |    |__ index.js            * 别的工具函数
   │
   │
   │——constants/                * 一些常量(其实没怎么用)
   │
   │
   │
   │──index.css                 * 全局的样式，其中也有修改了ant-mobile的样式
   │__index.js                  * 入口文件
```


### TODO

- ~~消息~~

- ~~用mobx重构~~

- ~~live demo~~

- 升级 react-router 到4

- 升级 antd-mobile 到 2.x

- ~~开发环境添加mobx devtool  没什么实际作用，不添加~~

### bug
- 未登录时，点击用户中心，会进入登录页，点击X，退出到首页，但是footer图标还是用户中心。
- 发布主题后，点击继续发布报错，不能继续发布。

### 特性
- 首页顶部tab添加客户端测试tab(key为dev)，完成
- 把loading组件拿出来放到最外面，避免在每个用到的地方都写一遍

### 如何启动
Step 1
```
git clone git@github.com:Juliiii/React-Cnode.git
```

Step 2
```
npm i
```

Step 3
```
npm start
```
#### license

No license
