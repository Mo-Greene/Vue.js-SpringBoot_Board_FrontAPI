import http from "@/api/http";

export async function getArticle() {
    return http.get('/boards')
}

export async function getArticleView(boardNo) {
    return http.get('/boards/notice/' + boardNo)
}

export async function postPasswordCheck(boardNo) {
    return http.post('/boards/password/' + boardNo)
}
