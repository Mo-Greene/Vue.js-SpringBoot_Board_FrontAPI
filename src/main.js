import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "@/pages/Home"
import Write from "@/components/Write";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/write',
        component: Write
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')
