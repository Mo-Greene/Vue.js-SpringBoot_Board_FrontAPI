<template>
  <div>
    {{ paging.page }}
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
  },
  data() {
    return {
      paging: []
    }
  },
  mounted() {
    this.getPagination()
  },
  methods: {
    getPagination() {
      this.$axios.get(this.$serverUrl + "/boards")
          .then(({data}) => {
            this.paging = data.resultData.page
            console.log(this.paging)})
          .catch((err) => {
            alert(err)
          })
    }
  }
}
</script>

<style scoped>

</style>
