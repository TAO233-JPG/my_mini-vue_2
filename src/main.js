import My_Vue from "../my-vue";

const options = {
  el: "#app",
  data: {
    a: 1,
    list: [1, 2, 3, 4],
    cat: {
      age: 12,
      name: "Kk",
    },
  },
};
const app = new My_Vue(options);

// 响应式test
document.querySelector("#btn_a").addEventListener("click", () => {
  app.a += 1;
  app.cat.age += 2;
  app.cat.name += 3;
});
document.querySelector("#btn_list").addEventListener("click", () => {
  options.data.list.push(options.data.list.length + 1);
});

console.log("app", app);
