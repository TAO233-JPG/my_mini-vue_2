let id = 0;

export default class Dep {
  constructor() {
    this.id = id++;
    this.subs = []; //存放Watcher实例，数据变化，通知watcher更新视图
  }
  // 依赖收集
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 派发更新
  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}

Dep.target = null;
const depTargetStack = [];

export function pushTarget(watcher) {
  Dep.target = watcher;
  depTargetStack.push(watcher);
}

export function popTarget() {
  depTargetStack.pop();
  Dep.target = depTargetStack[depTargetStack.length - 1];
}
