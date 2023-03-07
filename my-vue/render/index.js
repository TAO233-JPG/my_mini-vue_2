import nextTick from "../utils/nextTick";
import { createElement, createTextNode } from "../vnode";

export default function renderMixin(Vue) {
  Vue.prototype._render = function (el) {
    const vm = this;
    const render = vm.$options.render;
    const vnode = render.call(vm);
    return vnode;
  };

  Vue.prototype.$nextTick = nextTick;
  // 创建虚拟dom
  Vue.prototype._c = function (...args) {
    return createElement(this, ...args);
  };
  // 创建虚拟文本节点
  Vue.prototype._v = function (text) {
    return createTextNode(text);
  };
  // 处理变量属性
  Vue.prototype._s = function (val) {
    return val === null
      ? ""
      : typeof val === "object"
      ? JSON.stringify(val)
      : val;
  };
}
