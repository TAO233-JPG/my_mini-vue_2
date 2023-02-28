import observe from "../observer";

export default function initData(vm) {
  // 获取数据
  const _data = vm.$options.data;
  const data = (vm._data = typeof _data === "function" ? _data.call(vm) : _data);

  // 数据代理
  for (const key in data) {
    proxy(vm, "_data", key);
  }

  // 数据劫持核心
  observe(data);
}

function proxy(vm, sourceKey, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[sourceKey][key];
    },
    set(newVal) {
      vm[sourceKey][key] = newVal;
    },
  });
}
