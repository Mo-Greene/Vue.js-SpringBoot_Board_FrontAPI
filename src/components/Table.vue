<template>
  <div style="width: 768px; margin: auto;">
    <h4 class="mb-3">게시글</h4>
    <table>
      <thead>
      <tr>
        <th>카테고리</th>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
        <th>조회수</th>
        <th>등록일자</th>
        <th>수정일자</th>
      </tr>
      </thead>
      <tbody>
      <tr :key="i" v-for="(board,i) in boardList">
        <td>{{ board.categoryContent }}</td>
        <td><a @click="goToNotice(board.boardNo);">{{ board.boardTitle }}</a></td>
        <td>{{ board.boardContent }}</td>
        <td>{{ board.boardWriter }}</td>
        <td>{{ board.boardView }}</td>
        <td>{{ board.boardRegDate }}</td>
        <td>{{ board.boardModDate }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        requestBody: {},
        boardList: [],
        page: this.$route.query.page ? this.$route.query.page : 1,
        size: this.$route.query.size ? this.$route.query.size : 10,
        keyword: this.$route.query.keyword
      }
    },
    mounted() {
      this.getBoardList()
    },
    methods: {
      getBoardList() {
        this.$axios.get(this.$serverUrl + "/boards", {
          params: this.requestBody,
          headers: {}
        }).then(({data}) => {
          this.boardList = data.resultData.board
        }).catch((err) => {
          alert(err)
        })
      },
      goToNotice(boardNo) {
        this.$router.push({
          path:'/notice/' + boardNo
        })
      },
    }
  }
</script>
<style scoped>
  table {
    font-family: Arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
</style>
