import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "api/", // 서버 주소

  //   baseURL: "http://3.39.224.92:8080/api/", // 서버 주소
  withCredentials: true, // 쿠키 전송을 위해 설정
});

export default axiosInstance;
