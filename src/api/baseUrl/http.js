import axios from "axios";

const instance = axios.create({
    //todo .env 환경 변수로 뽑아내야된다.
    baseURL: 'http://localhost:8080'
});

export default instance;
