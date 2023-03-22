<!--자식 컴포넌트에서 api를 호출해서 사용하는건 너무 그 기능만 사용하게 된다고 말해주셨다.-->
<!--하지만 이런 경우 비밀번호확인하는 모달창은 결국 서버에서나 클라이언트에서나 그 의미로만 사용하게 될 것 같아 api를 자식클래스에 넣고 결과값을 반환하는 형태로 가져왔다.-->
<!--서버에서 비밀번호만 확인하는 api를 작성했기에 이렇게 만들어도 되지 않을까 싶다.-->
<!--하지만 이렇게 되면 서버에서 특정한 url 로만 접속하기에 이 컴포넌트는 그 url로서만 작용하는 컴포넌트가 되어버렸다.-->

<template>
  <div class="black-bg">
    <div class="white-bg">
      <h4>Password Check</h4>
      <button class="btn btn-light" @click="isModalOpen = false">닫기</button>&nbsp;
      <button class="btn btn-primary">확인</button>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "PasswordCheckModal",
  setup() {
    const passwordCheck = ref('');
    const visible = ref(false);
    const submit = () => {
      console.log('Check!')
    };

    return {
      passwordCheck,
      visible,
      submit
    }
  },
}
</script>

<style>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
