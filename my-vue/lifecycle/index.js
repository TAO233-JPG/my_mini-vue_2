import patch from "../vnode/patch";

export default function mountComponent(vm, el) {
  vm.$el = el;
  const vnode = vm._render()
  vm._update(vnode);
}

export function lifecycleMixin(vm) {
  vm.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
  };
}
