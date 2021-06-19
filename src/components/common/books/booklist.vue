<template>
  <div class="booklist">
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
<bookitem></bookitem>
  </div>
</template>

<script>
import Bookitem from "@/components/common/books/bookitem";
export default {
  components: {Bookitem}
}
</script>

<style scoped lang="scss">
  .booklist {
    display: flex;
    flex-wrap:wrap;
    position: relative;
    margin-top: 5px;
    justify-content: space-between;
  }
</style>