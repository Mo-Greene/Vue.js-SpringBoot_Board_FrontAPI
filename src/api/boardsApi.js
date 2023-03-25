import http from "@/api/baseUrl/http";

/**
 * 게시글 전체조회
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function getArticle() {
    return http.get('/boards')
}

/**
 * 게시글 검색조건 조회
 * @param keyword
 * @param categoryNo
 * @param date
 * @param page
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function getArticleQuery(keyword, categoryNo, date, page) {
    return http.get('/boards', {
        params: {
            keyword: keyword.value,
            categoryNo: categoryNo.value,
            from: date.value[0],
            to: date.value[1],
            page: page.value
        }
    })
}

/**
 * 특정 게시글 조회
 * @param boardNo
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function getArticleView(boardNo) {
    return http.get('/boards/notice/' + boardNo)
}

/**
 * 게시글 등록
 * @param formData
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function postArticle(formData) {
    return http.post('/boards/write', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
}

/**
 * 게시글 삭제 모달창 비밀번호 확인
 * @param boardNo
 * @param boardDTO
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function passwordCheck(boardNo, boardDTO) {
    return http.post('/boards/password/' + boardNo, boardDTO, {
        headers: {'Content-Type': 'application/json'}
    })
}

/**
 * 게시글 삭제
 * @param boardNo
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function deleteArticle(boardNo) {
    return http.delete('/boards/delete/' + boardNo)
}

/**
 * 게시글 수정
 * @param boardNo
 * @param boardDTO
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function modifyArticle(boardNo, boardDTO) {
    return http.put('/boards/modify/' + boardNo, boardDTO, {
        headers: {'Content-Type': 'application/json'}
        }
    )
}
