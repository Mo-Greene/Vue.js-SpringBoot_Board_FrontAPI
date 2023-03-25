import http from "@/api/baseUrl/http";

/**
 * 댓글 등록
 * @param boardNo
 * @param replyDTO
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function postReply(boardNo, replyDTO) {
    return http.post('/boards/notice/reply/' + boardNo, replyDTO, {
        headers: {'Content-Type': 'application/json'}
        }
    )
}
