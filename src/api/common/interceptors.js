import store from '@/store/index';
// 엑시오스 인터셉터
export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    //보내기 전
    function(config) {
      // Do something before request is sent
      //   config.headers.Authorization = '토큰 값 실기'
      config.headers.Authorization = store.state.token;
      return config;
    },
    //보냈을 때 에러처리
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    //받기 전
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    //받았을 때 에러처리
    function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );
  return instance;
}
