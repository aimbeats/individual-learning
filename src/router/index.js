import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import main from "@/view/main";

const modulesFiles = require.context("./module", true, /\.js$/);
console.log("modulesFiles", modulesFiles);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
const routes = [
  {
    path: "/",
    name: "main",
    component: main,
    children: [...[...Object.values(modules)].flat()],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
