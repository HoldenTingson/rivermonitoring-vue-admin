import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createStore } from "vuex";

createApp(App).use(createStore);
const appInstance = createApp(App);
appInstance.use(VueSweetalert2);
appInstance.use(store);

appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
