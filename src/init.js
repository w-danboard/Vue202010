import { initState } from "./state"

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options // 实例上有个属性$options 表示的是用户传入的所有属性

    // 初始化状态
    initState(vm)
    // initLifeCycle()

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    el = document.querySelector(el)
    const vm = this
    const options = vm.$options

    // 如果有render 就直接使用render
    // 没有render 看有没有template属性
    // 没有template 就截止找外部模板
    if (!options.render) {
      let template = options.template
      if (!template && el) {
        template = el.outerHTML // 火狐不兼容，可以document.createElement('div').appendChild('app').innerHTML
      }
      // 如何将模板编译成render函数
      const render = compileToFunctions(template) // 编译的核心方法
      options.render = render
    }
  }
}