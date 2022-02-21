import { initMixin } from "./init"

/**
 * Vue2中就是一个构造函数，不用class的原因是，用构造函数在原型扩展，用class即便也可以，但貌似违反了类的语法规范
 */
function Vue (options) {
  this._init(options) // 当调用new Vue时，就调用_init方法进行vue的初始化
}

// 可以拆分逻辑到不同的文件中，更利于代码维护，模块化的概念

// Vue是通过原型的方式，给Vue扩展功能
initMixin(Vue)

export default Vue