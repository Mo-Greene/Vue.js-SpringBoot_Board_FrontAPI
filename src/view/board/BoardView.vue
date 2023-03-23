<template>
  <div class="button-modal">
    <ModalView v-if="isModalViewed" @close-modal="isModalViewed = false">
      <PasswordCheck/>
    </ModalView>
  </div>

  <div style="width: 768px; margin: auto;">
    <h4 class="mb-3">게시글 - 조회</h4>
    <div>
      <div class="row">
        <div class="col-md-6 mb-3">
          Title :
          <label>{{ boardDetail.boardTitle }}</label>
        </div>
        <div class="col-md-6 mb-3">
          Writer :
          <label>{{ boardDetail.boardWriter }}</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          Category :
          <label>{{ boardDetail.categoryContent }}</label>
        </div>
        <div class="col-md-6 mb-3">
          View :
          <label>{{ boardDetail.boardView }}</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          RegDate :
          <label>{{ dateFormat(boardDetail.boardRegDate) }}</label>
        </div>
        <div class="col-md-6 mb-3">
          ModDate :
          <label>{{ dateFormat(boardDetail.boardModDate) }}</label>
        </div>
      </div>

      <div class="row">
        <div class="mb-3">
          Content :
          <label>{{ boardDetail.boardContent }}</label>
        </div>
      </div>

      <div class="row">
        <div class="mb-3" :key="i" v-for="(reply,i) in boardDetail.replyList">
          <label>{{ reply.replyContent }}</label>
          <div>{{ dateFormat(reply.replyRegDate) }}</div>
        </div>
      </div>

      <div class="Component-Reply">
        <ReplyWrite/>
      </div>

      <div class="buttons">
        <button type="button" class="btn btn-primary" @click="isModalViewed = true">수정</button>&nbsp;
        <button type="button" class="btn btn-danger" @click="findDelete">삭제</button>&nbsp;
        <button type="button" class="btn btn-dark" @click="list">목록</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {onMounted, provide, ref} from "vue";
import {useRouter} from "vue-router";
import ReplyWrite from "@/components/ReplyWrite";
import {dateFormat} from "@/assets/js/common";
import ModalView from "@/components/modal/ModalView";
import PasswordCheck from "@/components/modal/content/PasswordCheck";

export default {
  name: "BoardView",
  components: {PasswordCheck, ReplyWrite, ModalView},
  setup() {
    const router = useRouter();
    provide('boardNo', router.currentRoute.value.params.boardNo)

    const boardDetail = ref([]);

    const isModalViewed = ref(false);

    /**
     * 게시글 상세조회
     * @returns {Promise<void>}
     */
    const getBoardDetail = async () => {
      const response = await axios.get(
          "boards/notice/" + router.currentRoute.value.params.boardNo
      );
      boardDetail.value = response.data.resultData;
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
      list,
      findDelete,
      dateFormat,
      isModalViewed,
      boardDetail
    }
  },
}
</script>
