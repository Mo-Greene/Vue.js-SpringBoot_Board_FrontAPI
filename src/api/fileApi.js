import http from "@/api/baseUrl/http";

/**
 * 파일 조회 리스트
 * @param boardNo
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function getFileList(boardNo) {
    return http.get('/files/' + boardNo)
}

/**
 * 파일다운로드
 * @param fileNo
 * @returns {Promise<*>}
 */
export async function downloadFile(fileNo) {
    return http({
        url: '/files/download/' + fileNo,
        method: 'GET',
        responseType: 'blob'
    })
}
