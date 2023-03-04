import { arrayMethods } from "./array";
import Dep from "./Dep";

class Observer {
  constructor(data) {
    // 那么我们首先可以根据这个属性来防止已经被响应式观察的数据反复被观测
    // 响应式数据可以使用__ob__来获取 Observer 实例的相关方法,这对数组很关键
    Object.defineProperty(data, "__ob__", {
      value: this,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    this.dep = new Dep();
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods;
      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }

  observeArray(data) {
    data.forEach((item) => observe(item));
  }

  walk(data) {
    // console.log('walk data', data);
    const keys = Object.keys(data);
    keys.forEach((key) => {
      const val = data[key];
      defineReactive(data, key, val);
    });
    // for (let key in data) {
    //   defineReactive(data, key, data[key]);
    // }
  }
}

function defineReactive(obj, key, val) {
  const childObserver = observe(val); // 递归关键
  // 为每个属性配置一个dep
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      console.log(`get: key[${key}]`);
      // 依赖收集
      if (Dep.target) {
        dep.depend();

        if (childObserver) {
          childObserver.dep.depend();
          if (Array.isArray(val)) {
            dependArray(val);
          }
        }
      }

      return val;
    },

    set(newVal) {
      if (newVal === val) return;
      // 如果赋值一个新的对象也需要观察
      observe(newVal);
      console.log(`set: val[${val}] => [${newVal}]`);
      val = newVal;
      dep.notify(); // 派发更新
    },
  });
}

export default function observe(data) {
  if (
    Object.prototype.toString.call(data) === "[object Object]" ||
    Array.isArray(data)
  ) {
    const observer = new Observer(data);
    return observer;
  }
}

function dependArray(val) {
  val.forEach((item) => {
    item && item.__ob__ && item.__ob__.dep.depend();
    if (Array.isArray(item)) {
      dependArray(item);
    }
  });
}
