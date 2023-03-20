import { createRouter, createWebHistory } from 'vue-router'
import BoardView from "@/view/board/BoardView";
import BoardList from "@/view/board/BoardList";
import BoardWrite from "@/view/board/BoardWrite";

const routes = [
    {
        path: '/boards',
        name: 'board_list',
        component: BoardList
    },
    {
        path: '/boards/write',
        name: 'board_write',
        component: BoardWrite
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
