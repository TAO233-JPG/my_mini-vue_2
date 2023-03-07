import My_Vue from "../my-vue";

// 混入
My_Vue.mixin({
  created() {
    console.log("== mixin|created");
  },
  mounted() {
    console.log("== mixin|mounted: this", this);
  },
  // data 只能为函数
  data() {
    return {
      mixinA: "mixinA,只在mixin",
      mixinB: "mixinB,在mixin和实例中，这是mixin数据",
    };
  },
});
// 全局组件
My_Vue.component("parent-component", {
  template: `<div>我是全局组件</div>`,
});

const options = {
  el: "#app",
  // 用到mixin时， data不能为funtion
  data: {
    a: 1,
    mixinB: "mixinB,在mixin和实例中，这是实例数据",
    list: [1, 2, 3, 4],
    cat: {
      age: 12,
      name: "Kk",
    },
    num: 990,
  },

  computed: {
    a2() {
      return this.a + this.a;
    },
  },
  watch: {
    a(newVal, oldVal) {
      console.log("user - watch | a", newVal, oldVal);
    },
    "cat.age": function (newVal, oldVal) {
      console.log("user - watch | cat.age", newVal, oldVal);
    },
    "cat.name": {
      handler: function (newVal, oldVal) {
        console.log("user - watch - immediate | cat.name", newVal, oldVal);
      },
      immediate: true,
    },
  },
  beforeCreate() {
    console.log("== beforeCreate:this", this);
  },
  created() {
    console.log("== created:this", this);
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

setTimeout(() => {
  app.a = 33;
  app.a = 332;
  app.a = 3334;
  app.a = 33345;
}, 2000);
console.log("app", app);
