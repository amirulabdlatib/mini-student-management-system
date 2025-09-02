import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import useAuth from "./composable/useAuth";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const app = createApp(App);
const { attempt } = useAuth();

attempt().then(() => {
    app.use(router);
    app.mount("#app");
});
