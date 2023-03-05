import initState from "./state";
import compileToFunction from "./compiler";
import renderMixin from "./render";
import mountComponent, { callHook, lifecycleMixin } from "./lifecycle";
import mergeOptions from "./glabal-api/mergeOption";
import initGlobalApi from "./glabal-api/initGlobalApi";

function My_Vue(options) {
  this._init(options);
}

// 初始化相关操作
My_Vue.prototype._init = function (options) {
  const vm = this;
  vm.$options = mergeOptions(vm.constructor.options, options);
  callHook(vm, "beforeCreate");
  // 初始化状态
  initState(vm);
  callHook(vm, "created");

  // 模板编译
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};

My_Vue.prototype.$mount = function (el) {
  const vm = this;
  const options = vm.$options;
  const element = document.querySelector(el);

  // 没有渲染函数，需生成
  if (!options.render) {
    let template = options.template;

    if (!template && element) {
      template = element.outerHTML;
    }

    // 生成render函数
    if (template) {
      console.log("$mount/template", template);
      const render = compileToFunction(template);
      options.render = render;
    }
  }

  return mountComponent(vm, element);
};

initGlobalApi(My_Vue);
renderMixin(My_Vue);
lifecycleMixin(My_Vue);
export default My_Vue;
