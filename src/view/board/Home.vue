<template>
  <Table/>
  <Pagination/>
  <button style="margin-top: 20px" type="button" class="btn btn-primary" v-on:click="writePage">등록</button>
</template>

<script>
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";

export default {
  name: "Home",
  components: {Pagination, Table},
  methods: {
    writePage() {
      this.$router.push({
        path: "/boards/write"
      })
    },
  }
}
</script>

<style scoped>

</style>
