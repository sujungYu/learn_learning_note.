<div align="center">
<h1>캡틴 판교 vue.js 끝장내기  </h1>
2022년 02월 09일 ~ 2022년 02월 16일
</div>

### 학습 내용
+ 화면 UI 개발
+ Vue.js 실무 환경 구성
+ 백엔드 API 문서 읽는 방법

## Content
### [ 현대 웹 서비스 개발 절차 ]
+ 요구 사항 > 서비스 기획 > UI&UX 상세 설계 > GUI 디자인 > 퍼블리싱 > 백엔드 API 개발 > 프런트엔드 개발 > QA


### [ESLint]
+ JavaScript 코드에서 발견된 문제 패턴을 식별하기 위한 정적 코드 분석 도구

### [Prettier]
+ 코드 정리 도구(여러 사람이 코드 작성 방식 결정 가능)

### [Vue Router]
#### 코드 스플리팅
+ `component: () => import('파일 경로')`
+ 해당 URL을 요청 했을 때 페이지를 가져온다.
+ 초기에 애플리케이션 로딩 속도가 줄어든다.

#### redirect
+ 초기 진입 페이지 설정
```
{
  path: '/',
  redirect: '/특정 페이지'
}
```
#### 라우터 폴백
+ 라우터 속성에 없는 경로를 처리
```
{
  path: '*',
  component: () => import('@/views/NotFoundPage.vue)
}
```

### [API 설정 공통화]
```
import axios from 'axios';

// axios 를 baseURL을 잡아주고 인스턴스화 한다.
const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

function registerUser(userData) {
  // instance에서 post를 호출하여 회원가입 URL과 데이터를 파라미터로 넘긴다.
  return instance.post('signup', userData);
}

export { registerUser };
```

### [env 파일]
+ 키=값 형태로 정의할 수 있는 환경 변수 파일
+ .env : development 나 production가 존재하지 않을 때 실행 (가장 높은 우선 순위)
`VUE_APP_API_URL=http://vue-til.com/`
+ .env.development : 로컬에서 서버를 실행시킬 때 실행, 로컬 서버
`VUE_APP_API_URL=http://localhost:3000/`
+ .env.production : 배포할 때 실행, 도메인 주소
`VUE_APP_API_URL=https://vue-til.com/`

### [유효성 검사]
```
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export { validateEmail };
```
### [엑시오스 인터셉터]
+ 요청이나 반환을 처리하기 전에 미리 처리



### [dependencies]
+ 애플리케이션 로직과 관련된 라이브러리 목록
+ npm run build 시 최종적으로 자원이 변환

### [devDependencies]
+ npm run build 결과물에 포함되지 않는다. (배포할 때 포함되지 않음)


### [라우터 네이게이션 가드]
+ 로그인하지 않은 사용자가 특정 url 페이지로 이동했을 때 이동을 막는 것
+ 특정 라우터에 진입 하기 전에 beforeEnter 와 같은 라우터 네이게이션 가드를 이용해서 데이터 먼저 호출 후 받아왔을 때만 로딩하게 함
```
// router 변수에 VueRouter 저장
const router = new VueRouter({
  ...
});

// router 변수에서 beforeEach를 통해 이전 페이지 정보 출력과
//	다음 페이지 이동
// to: 이동하려는 페이지
// from: 현재 페이지
// next 페이지 이동할 때 호출하는 API
router.beforeEach((to, from, next) => {
  console.log(to);
  next();
});

// router export
export default router;
```
### [페이지별 인증 권한]
```
const router = new VueRouter({
  mode: 'history',
  routes: [
    ...
    // 권한이 필요한 페이지들은 meta에 auth 속성 추가
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/add',
      component: () => import('@/views/PostAddPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/post/:id',
      component: () => import('@/views/PostEditPage.vue'),
      meta: { auth: true },
    },
    ...
  ],
});

router.beforeEach((to, from, next) => {
  // 만약 
  if (to.meta.auth) {
    console.log('인증이 필요합니다');
  }
  next();
});

export default router;
```

### [프론트엔드 테스팅]
+ 테스트 코드를 짜게 되면 기능이 잘 돌아가는지 검증하는 방식을 직접 브라우저로 들어가는 것이 아니라 테스트 코드로 검증할 수 있다. 
#### Jest
+ 자바스크립트의 테이스팅 라이브러리

## Practice Project
### 학습 노트를 제공하는 서비스 (실습 프로젝트)

### Description
+ Token을 이용한 사용자 인증 기능
+ redirect로 초기 진입 페이지를 로그인 페이지로 설정
+ 라우터 네비게이션 가드를 이용해 페이지 접근 권한이 없는 사용자 접속 제한
+ Vue Test Utils 라이브러리를 이용해 로그인 페이지 동작 확인
+ 회원가입 유효성 검사 기능 구현
+ 코드 스플리팅을 활용해 페이지 로딩 속도 개설
+ ESLint를 활용해 코드를 일관성 있게 작성
+ Prettier을 활용해 코드 스타일을 일관되게 유지

## Application Project
### [offco](https://github.com/sujungYu/offco_web-app)
단체 모임을 위한 sns 서비스 (응용 프로젝트)
### [3355](https://github.com/sujungYu/3355_project/tree/master/src)
동네 이웃 간에 스터디를 구하고 관리하는 서비스 (응용 프로젝트)
