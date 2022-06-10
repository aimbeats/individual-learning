// import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
// import VueRouter from "vue-router";
import routes from "./router";
import store from "./store";
import axios from "axios";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import VueAxios from "vue-axios";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
// createApp.prototype.$axios = axios;
// createApp(App).use(store).use(router).config.globalProperties.$axios = axios;
// createApp(App).use(ElementPlus);
createApp(App).use(store).use(ElementPlus).use(routes).mount("#app");
// app.mount("#app");
