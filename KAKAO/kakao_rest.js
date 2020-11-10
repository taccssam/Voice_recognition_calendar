require("dotenv").config();

import axios from "axios";

export const Kakao = axios.create({
  baseURL: "https://kakaoi-newtone-openapi.kakao.com",
  headers: {
    Authorization: "KakaoAK {"+KAKAO_KEY+"}"
  }
});

export const recognize = params => {
  return Kakao.get("/v1/recognize", { params });
};

export const synthesize = params => {
  return Kakao.get("/v1/synthesize", { params });
};


