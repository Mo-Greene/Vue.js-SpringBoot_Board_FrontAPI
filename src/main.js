import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";

const app = createApp(App)
app.config.globalProperties.$axios = axios; //전역변수 설정 컴포넌 this.$axios 호출
app.config.globalProperties.$serverUrl = '//localhost:8080'
app.use(router).mount('#app')
