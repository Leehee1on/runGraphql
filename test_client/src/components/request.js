import axios from "axios";
// const SERVER = "http://192.168.0.52:49200";
const SERVER = "http://localhost:4000";

// API request 모듈
const request = async (url, method, headers = {}, jsonData) => {
  const Address = SERVER + "/" + url;

  try {
    const { data } = await axios[method](Address, {
      headers: {
        ...headers,
        "content-type": "application/json",
      },
      body: jsonData,
    });
    return data;
  } catch (error) {
    console.log("request function error", error, url);
    await Promise.reject(error);
  }
};
// 사용법
// request('/State/serverState', 'get');
export default request;
