<template>
  <div>
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
        <td>{{ board.boardTitle }}</td>
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
  import axios from "axios";
  import {reactive} from "vue";

  export default {
    name: 'Table',
    setup() {
      const state = reactive({
        boardList: []
      })

      axios.get("http://localhost:8080/boards/list").then(({data}) => {
        state.boardList = data.resultData.board
        console.log(state.boardList)
      })

      return state
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
