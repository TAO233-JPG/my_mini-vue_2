import mergeOptions from "./mergeOption";

export default function initGlobalApi(Vue) {
  Vue.options = {}; // 全局选项
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}
