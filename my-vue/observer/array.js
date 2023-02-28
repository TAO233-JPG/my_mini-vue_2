// 保留数组原生方法
const arrayProto = Array.prototype;

export const arrayMethods = Object.create(arrayProto);

const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "reverse",
  "sort",
];

methodsToPatch.forEach((method) => {
  arrayMethods[method] = function (...args) {
    // 调用原生的数组方法
    const res = arrayProto[method].apply(this, args);

    // this就是数据本身, __ob__是Observer实例
    const ob = this.__ob__;

    // 数组有新增操作
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
      default:
        break;
    }

    if (inserted) ob.observeArray(inserted);

    return res;
  };
});
