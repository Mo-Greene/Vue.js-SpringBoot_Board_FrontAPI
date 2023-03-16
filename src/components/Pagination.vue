<template>
  <div class="d-flex justify-content-center">
    <ul class="pagination flex-wrap">
      <li :key="i" v-for="(page,i) in pagination">
        <a class="page-item">{{ page.page }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";

export default {
  name: "Pagination",
  setup() {
    const state = reactive({
      pagination: []
    })

    axios.get("http://localhost:8080/boards").then(({data}) => {
      state.pagination = data.resultData.page
      console.log(state.pagination)
    })

    return state
  }
}
</script>

<style scoped>

</style>
