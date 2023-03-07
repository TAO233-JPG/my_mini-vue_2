// 定义生命周期
export const LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
];
const ASSETS_TYPE = ["component", "directive", "filter"];

//生命周期合并策略
function mergeHook(parentVal, childVal) {
  // 如果有儿子
  if (childVal) {
    if (parentVal) {
      // 合并成一个数组
      return parentVal.concat(childVal);
    } else {
      // 包装成一个数组
      return [childVal];
    }
  } else {
    return parentVal;
  }
}

function mergeAssets(parentVal, childVal) {
  const res = Object.create(parentVal); //比如有同名的全局组件和自己定义的局部组件 那么parentVal代表全局组件 自己定义的组件是childVal  首先会查找自已局部组件有就用自己的  没有就从原型继承全局组件  res.__proto__===parentVal
  if (childVal) {
    for (let k in childVal) {
      res[k] = childVal[k];
    }
  }
  return res;
}

// 合并策略
const strats = {};

// 为生命周期添加合并策略
LIFECYCLE_HOOKS.forEach((hook) => {
  strats[hook] = mergeHook;
});

// 组件 指令 过滤器的合并策略
ASSETS_TYPE.forEach((type) => {
  strats[type + "s"] = mergeAssets;
});
// mixin核心方法
export default function mergeOptions(parent, child) {
  const options = {};
  // 遍历父亲
  for (let k in parent) {
    mergeFiled(k);
  }
  // 父亲没有 儿子有
  for (let k in child) {
    if (!parent.hasOwnProperty(k)) {
      mergeFiled(k);
    }
  }

  //真正合并字段方法
  function mergeFiled(k) {
    if (strats[k]) {
      options[k] = strats[k](parent[k], child[k]);
    } else {
      // 默认策略
      options[k] = child[k] ? child[k] : parent[k];
      // 混入data
      if (k === "data" && child[k] && typeof parent[k] === "function") {
        const obj = parent[k]();
        options[k] = { ...obj, ...child[k] };
      }
    }
  }

  console.log("mergeOption", options);
  return options;
}
