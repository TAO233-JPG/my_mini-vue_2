import nextTick from "../utils/nextTick";
const queue = [];
let has = {};

function flushScheduleQueue() {
  queue.forEach((watcher) => watcher.run());
  queue.length = 0;
  has = {};
}

export function queueWatcher(watcher) {
  const id = watcher.id;
  if (!has[id]) {
    queue.push(watcher);
    has[id] = true;

    // 异步调用
    nextTick(flushScheduleQueue);
  }
}
