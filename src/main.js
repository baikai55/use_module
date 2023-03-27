import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 进度条
import "nprogress/nprogress.css";
//表格
import TableComponent from "./components/vue3_table_comp/tableComponent.vue";
import PaginationComponent from "./components/vue3_table_comp/paginationComponent.vue";
// 假数据
import "@/mock";
createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(TableComponent)
  .use(PaginationComponent)
  .use(router)
  .mount("#app");
