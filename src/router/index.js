import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/view/Home";
import Write from "@/components/Write";
import BoardView from "@/view/board/BoardView";

const routes = [
    {
        path: '/boards',
        name: 'board_list',
        component: Home
    },
    {
        path: '/boards/write',
        name: 'board_write',
        component: Write
    },
    {
        path: '/boards/notice/:boardNo',
        name: 'board_notice_view',
        component: BoardView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
