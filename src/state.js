// vue的数据 data computed watch...
export function initState (vm) {
  // 将所有数据都定义在vm属性上，并且后续更改，需要触发视图更新
  const opts = vm.$options // 获取用户属性

  if (opts.props) {}

  if (opts.methods) {}

  // 数据的初始化
  if (opts.data) {
    initData(vm)
  }

  if (opts.computed) {}
  if (opts.watch) {}

}

function initData (vm) {
  // 数据劫持 Object.defineProperty
  let data = vm.$options.data

  // 对data类型进行判断 如果是函数 获取函数返回值作为对象
  data = typeof data === 'function' ? data.call(vm) : data

  // 观测这个数据
  observe(data)
  
}