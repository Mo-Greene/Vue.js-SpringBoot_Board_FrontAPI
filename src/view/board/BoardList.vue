<template>
  <div class="container">
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
        <tr :key="i" v-for="(board,i) in state.boardList">
          <td>{{ board.categoryContent }}</td>
          <td><a @click="$router.push('/boards/notice/' + board.boardNo)">{{ board.boardTitle }}</a></td>
          <td>{{ board.boardContent }}</td>
          <td>{{ board.boardWriter }}</td>
          <td>{{ board.boardView }}</td>
          <td>{{ board.boardRegDate }}</td>
          <td>{{ board.boardModDate }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div>
    </div>

    <button style="margin-top: 20px" type="button" class="btn btn-primary" @click="$router.push('/boards/write')">등록</button>
  </div>
</template>

<script>
import axios from "axios";
import {reactive, onMounted} from "vue";

export default {
  name: "BoardList",
  components: {},
  setup() {
    const state = reactive({
      boardList: []
    })

    const getBoardList = async () => {
      const response = await axios.get("boards");
      state.boardList = response.data.resultData.board;
      console.log(state.boardList)
    };

    onMounted(() => {
      getBoardList();
    });

    return {
      state
    }
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
