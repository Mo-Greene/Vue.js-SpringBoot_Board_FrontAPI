import http from "@/api/http";

export async function getArticle() {
    return http.get('/boards')
}
