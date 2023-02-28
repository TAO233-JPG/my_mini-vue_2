import initState from "./state";

function My_Vue(options) {
  this._init(options);
}

// 初始化相关操作
My_Vue.prototype._init = function (options) {
  const vm = this;
  vm.$options = options
  // 初始化状态
  initState(vm)
};



export default My_Vue;
