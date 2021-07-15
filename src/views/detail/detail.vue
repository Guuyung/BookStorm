<template>


  <navigator>
    <div>
<!--      detail-->
<!--      {{ $route.query.id }}-->
    {{detail.title}}
    </div>
  </navigator>

  
      
    <img :src="detail.cover_url" class="cover">

    <van-card
        :num="detail.stock"
        :price="detail.price+'.00'"
        :desc="detail.description"
        :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">热卖</van-tag>
        <van-tag plain type="danger">推荐</van-tag>
      </template>
      <template #footer>
        <van-button type="warning">加入购物车</van-button>
        <van-button type="danger">立即购买</van-button>
      </template>
    </van-card>

    <van-tabs v-model="activeName">
      <van-tab title="详情" name="a">
        <div class="content" v-html="detail.details"></div>
      </van-tab>

      <van-tab title="热评" name="b">comments</van-tab>

      <van-tab title="相关图书" name="c">

          <bookitem v-for="book in like_goods"
                    :title="book.title"
                    :imgsrc="book.cover_url"
                    :price="book.price"
                    :key="book.id"
                    :collect-num="book.collects_count"
                    class="book"
                    :id="book.id"
                    @click="go(book.id)"
            >

          </bookitem>

      </van-tab>
    </van-tabs>


</template>

<script>
import scroll from '@/components/common/scroll'
import {toRefs} from 'vue'
import Navigator from '@/components/common/navigator'
import {useRoute, useRouter} from 'vue-router';
import {getdetail} from "@/network/detail";
import {onMounted, reactive, ref} from "vue";
import bookitem from "@/components/common/books/bookitem";

export default {
  components: {bookitem, Navigator,scroll},
  setup() {
    const router=useRouter();
    let activeName=ref('a');
    let book = reactive({
      detail:{},
      like_goods:{}
    });
    const route = useRoute();

    onMounted(()=>{
      getdetail(route.query.id).then(res => {


        book.detail = res.goods;

        book.like_goods = res.like_goods;

        console.log(book.like_goods)

      });


    })

    return {
      ...toRefs(book),
      activeName,
      go(id)
      {
        console.log(id)
        console.log('aaa')
        router.replace({path:'/detail',query:{id}})
      }

    }
  }
  ,
  mounted() {
    console.log("mounted...........")
  },
  unmounted() {
    console.log('unnnnnnnnnnnnn')
  }
}
</script>

<style scoped lang="scss">

.book {
  display: inline-block;
}
.cover {
  max-width: 100%;
  height: auto;

}
</style>