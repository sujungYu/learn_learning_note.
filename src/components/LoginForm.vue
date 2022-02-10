<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">id:</label>
        <input id="username" type="text" v-model="username" />
      </div>
      <div>
        <label for="password">pw:</label>
        <input id="passowrd" type="text" v-model="password" />
      </div>
      <button :disabled="!ifUsernameValid || !password" type="submit">
        로그인
      </button>
      <p>{{ logMessage }}</p>
    </form>
  </div>
</template>

<script>
import { loginUser } from '@/api/index';
import { validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      username: '',
      password: '',
      logMessage: '',
    };
  },
  computed: {
    ifUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          username: this.username,
          password: this.password,
        };
        const { data } = await loginUser(userData);
        console.log(data.user.username);
        this.logMessage = `${data.user.username} 님 환영합니다`;
        // this.initForm();
      } catch (error) {
        // console.log(error.response.data);
        this.logMessage = error.response.data; //로그인에 대한 실패 메세지
        // this.initForm();
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style></style>
