<template>
  <div>
    {{pagination}}
  </div>
</template>

<script>

import {inject} from "vue";

export default {
  name: "Pagination",
  components: {},
  setup() {
    const pagination = inject('pagination')
    console.log(pagination)

    return {
      pagination
    }
  },
}
</script>

<style scoped>

</style>
