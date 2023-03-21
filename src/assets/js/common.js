import dayjs from "dayjs";

/**
 * 날짜 변환 모듈
 * @param date
 * @returns {string}
 */
export const dateFormat = (date) => {
    if (date === null) {
        return '-';
    } else {
        return dayjs(date).format("YYYY.MM.DD HH:mm");
    }
}
