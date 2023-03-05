import Watcher from "../observer/Watcher";
import patch from "../vnode/patch";

export default function mountComponent(vm, el) {
  vm.$el = el;
  const updateComponent = () => {
    const vnode = vm._render();
    vm._update(vnode);
  };

  const watcher = new Watcher(vm, updateComponent, null, true);
  console.log(`\nwatcher`, watcher);
}

export function lifecycleMixin(vm) {
  vm.prototype._update = function (vnode) {
    const vm = this;
    const preVnode = vm._vnode;
    vm._vnode = vnode;
    if (preVnode) {
      vm.$el = patch(preVnode, vnode);
    } else {
      vm.$el = patch(vm.$el, vnode);
    }
  };
}
