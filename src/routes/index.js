import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
// import LoginPage from '@/views/LoginPage.vue';
// import SignupPage from '@/views/SignupPage.vue';

Vue.use(VueRouter); // Vue.use는 플러그인을 실행하기 위한 코드

// 라우터의 인스턴스가 생성
// export로 인해 라우터 인스턴스가 파일에서 밖으로 나가게 된다.
// defalut 현재 파일에서 하나의 변수나 함수가 나가게 되는 것을 의미
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      //   component: LoginPage,
      component: () => import('@/views/LoginPage.vue'), // 코드 스플리팅
    },
    {
      path: '/signup',
      //   component: SignupPage,
      component: () => import('@/views/SignupPage.vue'), // 코드 스플리팅
    },
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/add',
      component: () => import('@/views/PostAddPage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/post/:id',
      component: () => import('@/views/PostEditPage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다');
    next('/login');
    return;
  }
  next();
});

export default router;
