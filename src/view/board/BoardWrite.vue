<template>
  <div class="container">
    <div class="input-form-background row">
      <h4 class="mb-3">게시글 등록</h4>
      <div class="input-form col-md-12 mx-auto">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="categoryNo">Category</label>
            <select class="form-select" id="category" v-model.number="categoryNo">
              <option value="0">Select Category</option>
              <option value="1">JAVA</option>
              <option value="2">C</option>
              <option value="3">PYTHON</option>
            </select>
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
          <div class="col-md-6 mb-3">
            <label for="passwordCheck">Password Check</label>
            <input type="password" class="form-control" id="boardPasswordCheck" v-model="boardPasswordCheck">
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
import {ref} from "vue";
import {useRouter} from "vue-router";
import * as boardsApi from '@/api/boardsApi';

export default {
  name: "BoardWrite",
  setup() {
    const router = useRouter();

    const categoryNo = ref();
    const boardTitle = ref();
    const boardContent = ref();
    const boardWriter = ref();
    const boardPassword = ref();
    const boardPasswordCheck = ref();
    const file = ref();

    /**
     * 게시글 등록
     * @returns {Promise<void>}
     */
    const submit = async () => {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('boardDTO', new Blob([JSON.stringify({
                categoryNo: categoryNo.value,
                boardTitle: boardTitle.value,
                boardContent: boardContent.value,
                boardWriter: boardWriter.value,
                boardPassword: boardPassword.value,
                boardPasswordCheck: boardPasswordCheck.value,
              })],
              {type: 'application/json'},
          )
      );

      try {
        const response = await boardsApi.postArticle(formData);

        if (response.data.resultCode === 201) {
          alert('등록 성공');
          list();
        }
      } catch (error) {
        alert(error)
      }
    };

    /**
     * 파일업로드시 파일 추출 메서드
     * @param event
     */
    const fileUpload = (event) => {
      this.file = event.target.files[0];
      console.log(this.file)
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

    return {
      submit,
      fileUpload,
      list,
      categoryNo,
      boardTitle,
      boardContent,
      boardWriter,
      boardPassword,
      boardPasswordCheck,
      file
    }
  }
}
</script>

<style scoped>

</style>
