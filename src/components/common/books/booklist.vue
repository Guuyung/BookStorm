<template>
  <div class="booklist">

    <bookitem v-for="book in booklist[activeTab].books" :key="book"
              :title="book.title"
              :price="book.price"
              :collect-num="book.collects_count"
              :imgsrc="book.cover_url"
              :id="book.id">
    </bookitem>


  </div>
</template>

<script>

import Bookitem from "@/components/common/books/bookitem";
import {computed, onMounted, reactive, ref, watch, watchEffect} from "vue";
import {useStore} from 'vuex'
import {useRouter} from "vue-router";

export default {
  components: {Bookitem},
  props: {
    booklist: {
      type: Object,
      default: {}
    }
  },
  setup() {
    const router = useRouter();
    //初始化展示为热销的图书列表
    let activeTab = ref('sales');
    let store = useStore();

    let a = 2;
    //将vuex里的状态设为计算属性，状态更新时计算属性跟着变
    let cur = computed(() => store.state.curtab);
    let temp = computed(() => a * 2);


    watch([cur, activeTab], () => {

      switch (cur.value) {
        case 0:
          activeTab.value = 'sales';
          break;
        case 1:
          activeTab.value = 'new';
          break;
        case 2:
          activeTab.value = 'recommend';
          break;
      }
    })


    return {
      watch, activeTab,

    }
  }
}
</script>

<style scoped lang="scss">
.booklist {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: space-between;
}
</style>