<template>
  <div class="black-bg" v-if="isModalViewed === true">
    <div class="white-bg">
      <h3>PasswordCheck</h3>
      <button @click="isModalViewed = false" class="modal-exit-btn">닫기</button>
      <button @click="submit" class="btn btn-primary">확인</button>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "PasswordCheck",
  setup() {
    const isModalViewed = ref(false);

    return {
      isModalViewed
    }
  },
}
</script>

<style scoped>
.black-bg {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.432);
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.modal-exit-btn {
  margin-top: 30px;
}

.modal-exit-btn:hover {
  cursor: pointer;
}
</style>
