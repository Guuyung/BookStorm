<template>
  <div class="booklist">

    <bookitem v-for="book in booklist[activeTab].books" :key="book"
              :title="book.title"
              :price="book.price"
              :collect-num="book.collects_count"
              :imgsrc="book.cover_url">
    </bookitem>


  </div>
</template>

<script>

import Bookitem from "@/components/common/books/bookitem";
import {computed, onMounted, reactive, ref, watch, watchEffect} from "vue";
import {getGoodsList} from "@/network/home";
import {useStore} from 'vuex'

export default {
  components: {Bookitem},
  props: {
    booklist:{
      type:Object,
      default:{}
    }
  },
  setup(props) {
    // activeTab='sales';
    //获取3个书籍数组
    onMounted(() => {













    });
    let activeTab=ref('sales');
    let store=useStore();
    let cur=computed(()=>store.state.curtab);

    watch([cur,activeTab],()=>{
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
      watch,activeTab
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