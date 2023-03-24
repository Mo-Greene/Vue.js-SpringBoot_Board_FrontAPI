<template>
  <div id="modify-modal" class="black-bg" v-if="isModifyModal === true">
    <div class="white-bg">
      <h3>수정 비밀번호 확인</h3>
      <input type="password" class="form-control" v-model="passwordCheck">
      <button @click="isModifyModal = false" class="btn btn-light">닫기</button>&nbsp;
      <button @click="modifySubmit" class="btn btn-primary">확인</button>
    </div>
  </div>
  <div id="delete-modal" class="black-bg" v-if="isDeleteModal === true">
    <div class="white-bg">
      <h3>삭제 비밀번호 확인</h3>
      <input type="password" class="form-control" v-model="passwordCheck">
      <button @click="isDeleteModal = false" class="btn btn-light">닫기</button>&nbsp;
      <button @click="deleteSubmit" class="btn btn-primary">확인</button>
    </div>
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
        <button type="button" class="btn btn-primary" @click="isModifyModal = true">수정</button>&nbsp;
        <button type="button" class="btn btn-danger" @click="isDeleteModal = true">삭제</button>&nbsp;
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
import * as boardsApi from '@/api/boardsApi';

export default {
  name: "BoardView",
  components: {ReplyWrite},
  setup() {
    const router = useRouter();
    provide('boardNo', router.currentRoute.value.params.boardNo)

    const boardDetail = ref([]);
    const isModifyModal = ref(false);
    const isDeleteModal = ref(false);
    const passwordCheck = ref('');

    const deleteSubmit = async () => {
      const boardDTO = reactive({
        boardPassword: passwordCheck.value
      })

      //todo 하나의 모달창으로 수정, 삭제를 한꺼번에 처리한다는게 과연 가능할까;
      try {
        const response = await axios.post('boards/password/' + router.currentRoute.value.params.boardNo,
            boardDTO,
            {headers: {'Content-Type': 'application/json'}}
        );

        if (response.status === 204) {
          await findDelete();
          alert('Delete Article')
        }
      } catch (error) {
        alert(error)
      }
    }
    /**
     * 게시글 상세조회
     * @returns {Promise<void>}
     */
    const getBoardDetail = async () => {
      const response = await boardsApi.getArticleView(router.currentRoute.value.params.boardNo);
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
      console.log('delete?')
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
      isModifyModal,
      isDeleteModal,
      boardDetail,
      passwordCheck,
      deleteSubmit
    }
  },
}
</script>

<style>
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
</style>
