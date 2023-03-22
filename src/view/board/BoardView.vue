<template>
  <div v-if="isModalOpen === true">
    <PasswordCheckModal/>
  </div>

  <div style="width: 768px; margin: auto;">
    <h4 class="mb-3">게시글 - 조회</h4>
    <div>
      <div class="row">
        <div class="col-md-6 mb-3">
          Title :
          <label>{{ state.boardDetail.boardTitle }}</label>
        </div>
        <div class="col-md-6 mb-3">
          Writer :
          <label>{{ state.boardDetail.boardWriter }}</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          Category :
          <label>{{ state.boardDetail.categoryContent }}</label>
        </div>
        <div class="col-md-6 mb-3">
          View :
          <label>{{ state.boardDetail.boardView }}</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          RegDate :
          <label>{{ state.boardDetail.boardRegDate }}</label>
        </div>
        <div class="col-md-6 mb-3">
          ModDate :
          <label>{{ state.boardDetail.boardModDate }}</label>
        </div>
      </div>

      <div class="row">
        <div class="mb-3">
          Content :
          <label>{{ state.boardDetail.boardContent }}</label>
        </div>
      </div>

      <div class="row">
        <div class="mb-3" :key="i" v-for="(reply,i) in state.boardDetail.replyList">
          <label>{{ reply.replyContent }}</label>
          <div>{{ dateFormat(reply.replyRegDate) }}</div>
        </div>
      </div>

      <div class="Component-Reply">
        <ReplyWrite/>
      </div>

<!--      todo 모달창 작성해야됨-->
      <div class="buttons">
        <button type="button" class="btn btn-primary" @click="isModalOpen = true">수정</button>&nbsp;
        <button type="button" class="btn btn-danger" @click="findDelete">삭제</button>&nbsp;
        <button type="button" class="btn btn-dark" @click="list">목록</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {onMounted, provide, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import ReplyWrite from "@/components/ReplyWrite";
import {dateFormat} from "@/assets/js/common";
import PasswordCheckModal from "@/components/PasswordCheckModal";

export default {
  name: "BoardView",
  components: {PasswordCheckModal, ReplyWrite},
  setup() {

    const router = useRouter();
    provide('boardNo', router.currentRoute.value.params.boardNo)

    const state = reactive({
      boardDetail: []
    });

    const isModalOpen = ref(false);

    /**
     * 게시글 상세조회
     * @returns {Promise<void>}
     */
    const getBoardDetail = async () => {
      const response = await axios.get(
          "boards/notice/" + router.currentRoute.value.params.boardNo
      );
      state.boardDetail = response.data.resultData;
    };

    /**
     * 전체 게시글로 이동
     * //todo 나중에 공통 js로 해놓자
     */
    const list = () => {
      router.push({
        path: "/boards"
      });
    };

    /**
     * 게시글 삭제
     * @returns {Promise<void>}
     */
    const findDelete = async () => {
      await axios.delete("boards/delete/" + router.currentRoute.value.params.boardNo);
      alert("삭제 완료");
      list();
    }

    onMounted(() => {
      getBoardDetail();
    });

    return {
      state,
      list,
      findDelete,
      dateFormat,
      isModalOpen
    }
  },
}
</script>

<style>
body {
  margin : 0
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
