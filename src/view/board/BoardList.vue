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
          <td>{{ dateFormat(board.boardRegDate) }}</td>
          <td>{{ dateFormat(board.boardModDate) }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row-cols-3">
      <div class="mb-sm-3">
        <vue-date-picker v-model="date" placeholder="Select Date" range multi-calendars/>
      </div>
      <div>
        <label for="categoryNo">Category</label>
        <select class="form-select" id="category" v-model.number="categoryNo">
          <option value="0">Select Category</option>
          <option value="1">JAVA</option>
          <option value="2">C</option>
          <option value="3">PYTHON</option>
        </select>
      </div>
      <div>
        <input type="text" name="keyword" class="form-control" v-model="keyword" placeholder="검색어">
      </div>
      <div class="input-group mb-3">
        <div class="float-end" style="margin-top: 10px">
          <button class="btn btn-primary" @click="submitQuery">검색</button>
        </div>
      </div>
    </div>

    <button style="margin-top: 20px" type="button" class="btn btn-primary" @click="$router.push('/boards/write')">등록
    </button>
  </div>
</template>

<script>
import axios from "axios";
import {reactive, onMounted, ref} from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { dateFormat } from "@/assets/js/common";

export default {
  name: "BoardList",
  components: {VueDatePicker},
  setup() {
    const date = ref();
    const keyword = ref();
    const categoryNo = ref();

    const state = reactive({
      boardList: []
    });

    const submitQuery = async () => {
      const response = await axios.get("boards", {
        params: {
          keyword: keyword.value,
          categoryNo: categoryNo.value,
          from: date.value[0],
          to: date.value[1]
        }
      });
      state.boardList = response.data.resultData.board;
    };

    const getBoardList = async () => {
      const response = await axios.get("boards");
      state.boardList = response.data.resultData.board;
    };

    onMounted(() => {
      getBoardList();

      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() - 7));
      date.value = [startDate, endDate];
    });

    return {
      state,
      date,
      submitQuery,
      dateFormat,
      keyword,
      categoryNo
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
