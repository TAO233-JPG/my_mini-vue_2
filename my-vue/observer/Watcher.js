import { pushTarget, popTarget } from "./Dep";
import { queueWatcher } from "./scheduler";
import { isObject } from "../utils/index";
let id = 0;

export default class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.id = id++;
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb; // 回调函数，如在watcher更新之前可以执行beforeUpdate方法
    this.deps = [];
    this.depsId = new Set();

    this.user = options.user;
    this.lazy = options.lazy; // 表明是computed watcher
    this.dirty = this.lazy; // 判断要不要重新计算
    if (typeof exprOrFn === "function") {
      this.getters = exprOrFn;
    } else {
      this.getters = function () {
        const path = exprOrFn.split(".");
        let obj = vm;
        path.forEach((p) => {
          obj = obj[p];
        });
        return obj;
      };
    }

    this.value = this.lazy ? undefined : this.get();
  }

  get() {
    pushTarget(this);
    const res = this.getters.call(this.vm);
    popTarget(this);
    return res;
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
    // 计算watcher
    if (this.lazy) {
      this.dirty = true;
    } else {
      // 渲染watcher
      // 每次watcher.update调用时，先缓存起来，之后一起更新
      queueWatcher(this);
    }
  }
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  depend() {
    this.deps.forEach((dep) => dep.depend());
  }

  run() {
    const newVal = this.get();
    const oldVal = this.value;
    this.value = newVal;
    if (this.user) {
      if (newVal !== oldVal || isObject(newVal)) {
        this.cb.call(this.vm, newVal, oldVal);
      }
    } else {
      this.cb.call(this.vm);
    }
  }
}
