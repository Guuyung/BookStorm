<template>
  <div class="booklist">

    <bookitem v-for="book in booklist[activeTab]" :key="book.id"
              :title="book.title"
              :price="book.price"
              :collect-num="book.collects_count"
              :imgsrc="book.cover_url">
    </bookitem>


  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Bookitem from "@/components/common/books/bookitem";
import {computed, onMounted, reactive, ref, watch, watchEffect} from "vue";
import {getGoodsList} from "@/network/home";
import {useStore} from 'vuex'

export default {
  components: {Bookitem},
  props: {
  },
  setup(props) {
    let booklist = reactive({
      sales: [],
      recommend: [],
      new: []
    });
    // activeTab='sales';
    //获取3个书籍数组
    onMounted(() => {
      console.log(".....")
      getGoodsList(1, 'sales').then((res) => {
        booklist.sales = res.goods.data;
        console.log()
      });
      getGoodsList(1, 'recommend').then((res) => {
        booklist.recommend = res.goods.data;
      });
      getGoodsList(1, 'new').then((res) => {
            booklist.new = res.goods.data
          }
      )
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
      booklist,watch,activeTab
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