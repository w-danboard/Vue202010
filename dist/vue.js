(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  // vue的数据 data computed watch...
  function initState(vm) {
    // 将所有数据都定义在vm属性上，并且后续更改，需要触发视图更新
    var opts = vm.$options; // 获取用户属性

    if (opts.props) ;

    if (opts.methods) ; // 数据的初始化


    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    // 数据劫持 Object.defineProperty
    var data = vm.$options.data; // 对data类型进行判断 如果是函数 获取函数返回值作为对象

    data = typeof data === 'function' ? data.call(vm) : data; // 观测这个数据

    observe(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 实例上有个属性$options 表示的是用户传入的所有属性
      // 初始化状态

      initState(vm); // initLifeCycle()
    };
  }

  /**
   * Vue2中就是一个构造函数，不用class的原因是，用构造函数在原型扩展，用class即便也可以，但貌似违反了类的语法规范
   */

  function Vue(options) {
    this._init(options); // 当调用new Vue时，就调用_init方法进行vue的初始化

  } // 可以拆分逻辑到不同的文件中，更利于代码维护，模块化的概念
  // Vue是通过原型的方式，给Vue扩展功能


  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
