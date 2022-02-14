import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

// 엑시오스 초기화 함수
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
    // headers: {
    //   Authorization: store.state.token,
    // },
  });
  return setInterceptors(instance); //엑시오스 인터셉터
}
export const instance = createInstance();
export const posts = createInstanceWithAuth('posts');
