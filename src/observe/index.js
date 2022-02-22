class Observer {
  constructor (value) { // 需要对这个value属性重新定义
    this.walk(value)
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
  Object.defineProperty(data, key, {
    get () {
      return value
    },
    set (newValue) {
      if (newValue === value) return
      value = newValue
    }
  })
}

export function observe (data) {
  // 只对对象类型进行观察 非对象类型无法观察
  if (typeof data !== 'object' || data === null) {
    return
  }
  // 通过类来实现对数据的观察，类可以方便扩展，会产生一个实例，这个实例可以作为一个唯一标识
  return new Observer(data)
}