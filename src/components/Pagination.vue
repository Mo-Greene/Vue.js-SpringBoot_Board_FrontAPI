<template>
  <div>
    페이지네이션
    {{ pagination }}
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
