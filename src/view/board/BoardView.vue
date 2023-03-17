<template>
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
          <label>{{ boardDetail.boardRegDate }}</label>
        </div>
        <div class="col-md-6 mb-3">
          ModDate :
          <label>{{ boardDetail.boardModDate }}</label>
        </div>
      </div>

      <div class="row">
        <div class="mb-3">
          Content :
          <label>{{ boardDetail.boardContent }}</label>
        </div>
      </div>

      <div class="buttons">
        <button type="button" class="btn btn-primary" v-on:click="findUpdate">수정</button>&nbsp;
        <button type="button" class="btn btn-danger" v-on:click="findDelete">삭제</button>&nbsp;
        <button type="button" class="btn btn-dark" v-on:click="list">목록</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "BoardView",
  data() {
    return {
      boardNo: 36,
      boardDetail: []
    }
  },
  created() {
    this.getBoardDetail();
  },
  methods: {
    async getBoardDetail() {
      this.$axios.get(this.$serverUrl + "/boards/notice/" + this.boardNo).then(({data}) => {
        this.boardDetail = data.resultData
        console.log(this.boardDetail)
      })
    },
    list() {
      this.$router.push({
        path: '/'
      })
    },
  }
}
</script>

<style scoped>

</style>
