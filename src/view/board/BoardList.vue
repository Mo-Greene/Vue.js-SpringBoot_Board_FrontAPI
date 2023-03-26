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
              <tr :key="i" v-for="(board,i) in boardList">
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

<!--    <div>-->
<!--      <div class="overflow-auto">-->
<!--        <b-pagination-->
<!--            v-model="currentPage"-->
<!--            :total-rows="rows"-->
<!--            :per-page="perPage"-->
<!--            align="center"-->
<!--            aria-controls="boardTable"-->
<!--        ></b-pagination>-->
<!--        <b-table-->
<!--            id="boardTable"-->
<!--            :items="boardList"-->
<!--            :per-page="perPage"-->
<!--            :current-page="currentPage"-->
<!--        ></b-table>-->
<!--      </div>-->
<!--    </div>-->

    <div class="row-cols-3" id="findQuery">
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
import {computed, onMounted, ref} from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {dateFormat} from "@/assets/js/common";
import * as boardsApi from '@/api/boardsApi';

export default {
  name: "BoardList",
  components: {VueDatePicker},
  setup() {
    //todo ref 권장
    const date = ref();
    const keyword = ref();
    const categoryNo = ref();
    const boardList = ref([]);
    const page = ref();
    const size = ref();
    const pagination = ref([]);

    // 페이지네이션
    const currentPage = 1;
    const perPage = 10;
    const rows = computed(() => {
      return boardList.value.length;
    });

    /**
     * 검색조건
     * @returns {Promise<void>}
     */
    const submitQuery = async () => {
      const response = await boardsApi.getArticleQuery(keyword, categoryNo, date, page)
      console.log(response)
      boardList.value = response.data.resultData.board;
    };

    /**
     * 게시글 리스트
     * @returns {Promise<void>}
     */
    const getBoardList = async () => {
      const response = await boardsApi.getArticle();
      boardList.value = response.data.resultData.board;
      pagination.value = response.data.resultData.page;
    };


    onMounted(() => {
      getBoardList();

      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() - 7));
      date.value = [startDate, endDate];
    });

    return {
      date,
      submitQuery,
      dateFormat,
      keyword,
      categoryNo,
      page,
      size,
      boardList,
      currentPage,
      perPage,
      rows,
      pagination
    }
  },
  data() {
    return {
      // perPage: 5,
      // currentPage: 1,
    }
  },
  computed: {
    // rows() {
    //   return this.boardList.length;
    // },
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
