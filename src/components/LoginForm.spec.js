import { shallowMount } from '@vue/test-utils';
// import Vue from 'vue';
import LoginForm from './LoginForm.vue';

describe('LoginForm.vue', () => {
  test('ID는 이메일 형식이어야 한다.', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          username: 'test',
        };
      },
    });
    const warningText = wrapper.find('.warning');
    expect(warningText.exists()).toBeTruthy();
    // const idInput = wrapper.find('#username');
    // console.log(idInput.element.value);
    // console.log(wrapper.vm.isUsernameValid);
  });

  test('ID와 PW가 입력되지 않으며 로그인 버튼이 비활성화 된다.', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          username: '',
          password: '',
        };
      },
    });
    const button = wrapper.find('button');
    expect(button.element.ariaDisabled).toBeTruthy();
  });
  //   test('컴포넌트가 마운팅되면 화면에 그려져야 한다.' , () => {
  //     // const instance = new Vue(LoginForm).$mount();
  //     const warpper = shallowMount(LoginForm);
  //     expect(warpper.vm.username).toBe('');
  //   });
});
