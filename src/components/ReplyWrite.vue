<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <input type="text" v-model="replyContent" class="form-control" placeholder="댓글">
          <button class="btn btn-outline-secondary" @click="replyRegister">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {inject, ref} from "vue";
import * as replyApi from "@/api/replyApi"

export default {
  name: "ReplyWrite",
  setup() {
    const replyContent = ref();
    const boardNo = inject('boardNo');

    /**
     * 댓글 등록
     * @returns {Promise<void>}
     */
    const replyRegister = async () => {
      const replyDTO = {
        replyContent: replyContent.value
      }

      const response = await replyApi.postReply(boardNo, replyDTO);

      if (response.status === 201) {
        alert("댓글 등록 성공");
        location.reload()
      }
    };

    return {
      replyRegister,
      replyContent
    }
  },
}
</script>

<style scoped>

</style>
