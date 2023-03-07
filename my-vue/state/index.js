import initData from "./initData";
import initWatch from "./initWatch";

export default function initState(vm) {
  const opts = vm.$options;

  if (opts.props) {
    // initProps(vm);
  }
  if (opts.methods) {
    // initMethod(vm);
  }
  if (opts.data) {
    // 初始化data
    initData(vm);
  }
  if (opts.computed) {
    // initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
}
