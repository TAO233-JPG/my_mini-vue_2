import { arrayMethods } from "./array";

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
  observe(val); // 递归关键

  Object.defineProperty(obj, key, {
    get() {
      console.log(`get: key[${key}]`);
      return val
    },

    set(newVal) {
      if (newVal === val) return;
      console.log(`set: val[${val}] => [${newVal}]`);
      val = newVal;
    },
  });
}

export default function observe(data) {
  if (
    Object.prototype.toString.call(data) === "[object Object]" ||
    Array.isArray(data)
  ) {
    return new Observer(data);
  }
}
