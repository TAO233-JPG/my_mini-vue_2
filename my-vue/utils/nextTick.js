let pending = false;
const callbacks = [];
const p = Promise.resolve();
const timerFn = () => {
  p.then(flushCallback);
};

// 会被以微任务的形式调用
function flushCallback() {
  pending = false;
  callbacks.forEach((cb) => cb());
}

export default function nextTick(cb) {
  callbacks.push(cb);
  if (!pending) {
    pending = true;
    timerFn();
  }
}
