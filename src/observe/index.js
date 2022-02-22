import { arrayMethods } from "./array"

class Observer {
  constructor (value) { // 需要对这个value属性重新定义

    // value可能是对象，也可能是数组，分类处理
    // value.__ob__ = this
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false,   // 不能被枚举，不能被循环
      configurable: false  // 不能删除此属性
    })
    if (Array.isArray(value)) {
      // 数组不用defineProperty来进行代理，因为性能不好
      // push shift reverse sort 重写这些方法，增加更新逻辑
      value.__proto__ = arrayMethods // 当是数组时，改写方法为自己重写后的方法
      // Object.setPrototypeOf(value, arrayMethods)

      // {obj: { a: [] }}
      this.observeArray(value) // 原有数组中的对象 Object.freeze()
    } else {
      this.walk(value)
    }
  }

  observeArray (value) {
    for (let i = 0; i < value.length; i++) {
      observe(value[i])
    }
  }

  walk (data) {
    // 将对象中的所有key，重新用defineProperty定义成响应式的
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}

// Vue.util.defineReactive() 有可能在util里 后续看源码
export function defineReactive (data, key, value) {

  // value 可能也是一个对象
  observe(value) // 对结果递归拦截，所以vue2写代码时候，尽量数据不要嵌套过深，过深会浪费性能

  Object.defineProperty(data, key, {
    get () {
      return value
    },
    set (newValue) {
      if (newValue === value) return
      observe(newValue) // 如果用户设置的是一个对象，就继续将用户设置的对象变成响应式的
      value = newValue
    }
  })
}

export function observe (data) {
  // 只对对象类型进行观察 非对象类型无法观察
  if (typeof data !== 'object' || data === null) {
    return
  }
  // 有__ob__说明观测过了，防止循环引用
  if (data.__ob__) {
    return
  }
  // 通过类来实现对数据的观察，类可以方便扩展，会产生一个实例，这个实例可以作为一个唯一标识
  return new Observer(data)
}