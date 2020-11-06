import axios from "axios";

export const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com", // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: "KakaoAK {7b08f2de8822b6ee1b328aaafa94d0f6}" // 공통으로 요청 할 헤더
  }
});


