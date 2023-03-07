import mergeOptions from "./mergeOption";
const ASSETS_TYPE = ["component", "directive", "filter"];

export default function initGlobalApi(Vue) {
  Vue.options = {}; // 全局选项
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
  ASSETS_TYPE.forEach((type) => {
    Vue.options[type + "s"] = {};
  });
  Vue.options._base = Vue;

  initExtend(Vue);
  initAssetRegisters(Vue);
}

function initExtend(Vue) {
  let cid = 0;
  Vue.extend = function (options) {
    function Sub(options = {}) {
      this._init(options);
    }
    Sub.cid = cid++;
    Sub.prototype = Object.create(Vue.prototype);
    Sub.prototype.constructor = Sub;
    Sub.options = mergeOptions(Vue.options, options);
    return Sub;
  };
}

function initAssetRegisters(Vue) {
  ASSETS_TYPE.forEach((type) => {
    Vue[type] = function (id, definition) {
      if (type === "component") {
        //   this指向Vue
        // 全局组件注册
        // 子组件可能也有extend方法  VueComponent.component方法
        definition = this.options._base.extend(definition);
      }
      this.options[type + "s"][id] = definition;
    };
  });
}
