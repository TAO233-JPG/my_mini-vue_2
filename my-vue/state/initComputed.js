import Watcher from "../observer/Watcher";
import Dep from "../observer/Dep";
export default function initComputed(vm) {
  const computed = vm.$options.computed;

  const watchers = (vm._computedWatchers = {}); //用来存放计算watcher
  for (let k in computed) {
    const userDef = computed[k]; //获取用户定义的计算属性
    const getter = typeof userDef === "function" ? userDef : userDef.get; //创建计算属性watcher使用
    // 创建计算watcher  lazy设置为true
    watchers[k] = new Watcher(vm, getter, () => {}, { lazy: true });
    defineComputed(vm, k, userDef);
  }
}

function defineComputed(target, key, userDef) {
  const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
  };
  if (typeof userDef === "function") {
    // 如果是一个函数  需要手动赋值到get上
    sharedPropertyDefinition.get = createComputedGetter(key);
  } else {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = userDef.set;
  }
  //   利用Object.defineProperty来对计算属性的get和set进行劫持
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

// 重写计算属性的get方法 来判断是否需要进行重新计算
function createComputedGetter(key) {
  return function () {
    const watcher = this._computedWatchers[key]; //获取对应的计算属性watcher
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate(); //计算属性取值的时候 如果是脏的  需要重新求值
        if (Dep.target) {
          // 如果Dep还存在target 这个时候一般为渲染watcher 计算属性依赖的数据也需要收集
          watcher.depend();
        }
      }
      return watcher.value;
    }
  };
}
