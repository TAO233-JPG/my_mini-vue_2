import { pushTarget, popTarget } from "./Dep";

let id = 0;

export default class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.id = id++;
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb; // 回调函数，如在watcher更新之前可以执行beforeUpdate方法

    this.deps = [];
    this.depsId = new Set();

    if (typeof exprOrFn === "function") {
      this.getters = exprOrFn;
    }

    this.get();
  }

  get() {
    pushTarget(this);
    this.getters();
    popTarget(this);
  }

  addDep(dep) {
    const id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  update() {
    this.get();
  }
}