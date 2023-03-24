import { createRouter, createWebHistory } from 'vue-router'
import BoardView from "@/view/board/BoardView";
import BoardList from "@/view/board/BoardList";
import BoardWrite from "@/view/board/BoardWrite";
import BoardModify from "@/view/board/BoardModify";

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
    },
    {
        path: '/boards/modify/:boardNo',
        name: 'board_modify',
        component: BoardModify
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
