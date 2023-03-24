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
import {onMounted, ref} from "vue";

export default {
  name: "BoardModify",
  setup() {
    const router = useRouter();
    const boardDetail = ref([])

    const getBoardDetail = async () => {
      const response = await boardsApi.getArticleView(router.currentRoute.value.params.boardNo);
      boardDetail.value = response.data.resultData;
      console.log(boardDetail.value)
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

    onMounted(() => {
       getBoardDetail();
    })

    return {
      router,
      list,
      boardDetail
    }
  },
}
</script>

<style scoped>

</style>
