import axios, { Method } from "axios";
const SERVER = "http://localhost:4000";
const SERVER_TEST = "http://192.168.0.52:49221/api/v1/";

// API request 모듈

interface Props {
  url: String;
  method: Method;
  headers: any;
  jsonData: any;
}

const request = async (url: String, method: Method, headers = {}, jsonData: any) => {
  // const request = async ({url, method, headers = {}, jsonData}:Props) => {
  const Address = SERVER + "/" + url;

  try {
    const { data } = await axios({
      method: method,
      url: Address,
      headers: {
        ...headers,
        "content-type": "application/json",
      },
      data: jsonData,
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
