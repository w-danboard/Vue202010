# Vue202010

```                rollup和babel的桥梁   babel核心模块 es6-es5           启动webpack服务
npm install rollup rollup-plugin-babel @babel/core  @babel/preset-env rollup-plugin-serve
```

### 关于打包

库 => rollup 项目 => webpack

### 关于vue2的缺陷

由于vue2使用的是options API，tree-shaking有些缺陷，比如写在methods中的fn，它不知道是否会使用，所以即便不使用也不会干掉