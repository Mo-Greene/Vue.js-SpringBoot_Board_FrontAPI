<template>
  <div class="container">
    <div class="input-form-background row">
      <div class="input-form col-md-12 mx-auto">
        <h4 class="mb-3">게시글 등록</h4>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="categoryNo">Category</label>
            <select class="form-select" id="category" v-model="categoryNo">
              <option value="0">Select Category</option>
              <option value=1>JAVA</option>
              <option value=2>C</option>
              <option value=3>PYTHON</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="boardTitle">Title</label>
            <input type="text" class="form-control" id="boardTitle" placeholder="" v-model="boardTitle">
          </div>
          <div class="col-md-6 mb-3">
            <label for="boardWriter">Writer</label>
            <input type="text" class="form-control" id="boardWriter" placeholder="" v-model="boardWriter">
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

        <div class="mb-4">
          <button class="btn btn-primary btn-lg btn-block" @click="submit()">Posting</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categoryNo: '',
      boardTitle: '',
      boardContent: '',
      boardWriter: '',
      boardPassword: '',
      boardPasswordCheck: '',
      file: ''
    }
  },
  methods: {
    submit() {
      const formData = new FormData();

      formData.append('file', this.file, this.file.name)
      formData.append('boardDTO', new Blob([JSON.stringify({
        categoryNo: this.categoryNo,
        boardTitle: this.boardTitle,
        boardContent: this.boardContent,
        boardWriter: this.boardWriter,
        boardPassword: this.boardPassword,
        boardPasswordCheck: this.boardPasswordCheck
      })], {type: "application/json"})
      );

      axios.post('http://localhost:8080/boards/write', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(res => {
        console.log('Success')
        console.log(res)
      }).catch(res => {
        console.log('Failure')
        console.log(res)
      })
    },

    fileUpload(event) {
      this.file = event.target.files[0];
    },
  }
}
</script>
<style scoped>

</style>
