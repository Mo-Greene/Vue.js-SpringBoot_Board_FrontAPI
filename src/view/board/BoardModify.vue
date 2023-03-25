<template>
  <div class="container">
    <div class="input-form-background row">
      <h4 class="mb-3">게시글 수정</h4>
      <div class="input-form col-md-12 mx-auto">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="categoryContent">Category : </label>
            {{ boardDetail.categoryContent }}
          </div>
          <div class="col-md-6 mb-3">
            <label for="view">View : </label>
            {{ boardDetail.boardView }}
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="regDate">RegDate : </label>
            {{ dateFormat(boardDetail.boardRegDate) }}
          </div>
          <div class="col-md-6 mb-3">
            <label for="modDate">ModDate : </label>
            {{ dateFormat(boardDetail.boardModDate) }}
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="boardTitle">Title</label>
            <input type="text" class="form-control" id="boardTitle" v-model="boardTitle">
          </div>
          <div class="col-md-6 mb-3">
            <label for="boardWriter">Writer</label>
            <input type="text" class="form-control" id="boardWriter" v-model="boardWriter">
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="boardPassword" v-model="boardPassword">
          </div>
        </div>

        <div class="row">
          <div class="mb-3">
            <label for="boardContent">Content</label>
            <textarea class="form-control" id="boardContent" v-model="boardContent"></textarea>
          </div>
        </div>

        <div class="row">
          <label for="formFileSm" class="form-label">Files</label>
          <div class="mb-3">
            <input @change="fileUpload" type="file" class="form-control form-control-sm"/>
          </div>
        </div>

        <div class="mb-3">

        </div>
        <button class="btn btn-primary btn-light" @click="list">목록</button>&nbsp;
        <button class="btn btn-primary btn-block" @click="submit">등록</button>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router/dist/vue-router";
import * as boardsApi from "@/api/boardsApi";
import {onMounted, reactive, ref} from "vue";
import {dateFormat} from "@/assets/js/common";

export default {
  name: "BoardModify",
  setup() {
    const router = useRouter();
    const boardNo = router.currentRoute.value.params.boardNo;

    const boardDetail = ref([])
    const boardTitle = ref();
    const boardWriter = ref();
    const boardContent = ref();
    const boardPassword = ref();
    const file = ref();

    /**
     * 게시글 가져오기
     * @returns {Promise<void>}
     */
    const getBoardDetail = async () => {
      const response = await boardsApi.getArticleView(boardNo);
      boardDetail.value = response.data.resultData;
    };

    /**
     * 수정 클릭
     * @returns {Promise<void>}
     */
    // todo 수정시 비밀번호가 필요없는데 또 들어가야된다고 뜬다. 확인해서 고치자
    const submit = async () => {
      const boardDTO = reactive({
        boardTitle: boardTitle.value,
        boardWriter: boardWriter.value,
        boardContent: boardContent.value,
        boardPassword: boardPassword.value
      })

      try {
        const response = await boardsApi.modifyArticle(boardNo, boardDTO);

        if (response.data.resultCode === 200) {
          alert('등록 성공');
          list();
        }
      } catch (error) {
        alert(error)
      }
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
     * 파일 업로드 '업로드만 구현'
     * @param event
     */
    const fileUpload = (event) => {
      this.file = event.target.files[0];
      console.log(this.file)
    };

    onMounted(() => {
       getBoardDetail();
    })

    return {
      router,
      dateFormat,
      list,
      fileUpload,
      submit,
      file,
      boardDetail,
      boardTitle,
      boardWriter,
      boardContent,
      boardPassword
    }
  },
}
</script>

<style scoped>

</style>
