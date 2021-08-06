<template>


  <navigator>
    <div>
      {{ detail.title }}
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
      <van-button @click="collect(detail.id)" style="margin-left: 5px"
                  color="linear-gradient(to right, #ff6034, #ee0a24)">
        {{ isCollected == 1 ? '已收藏' : '加入收藏' }}
      </van-button>
      <van-button type="warning" @click="goCart">加入购物车</van-button>
      <van-button type="danger" @click="buyNow">立即购买</van-button>
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
                @click="$router.replace({path:'/detail',query:{id:book.id}})"
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
import {addCart, getCart} from "@/network/shopCart";
import {Toast} from "vant";
import {useStore} from "vuex";
import {doCollect} from "@/network/collection";
import {goupdateAva} from "@/network/profile";

export default {
  name:'detail',
  components: {bookitem, Navigator, scroll},
  setup() {
    let isCollected = ref(0);
    const store = useStore();
    const router = useRouter();
    let activeName = ref('a');
    let book = reactive({
      detail: {},
      like_goods: {}
    });
    const route = useRoute();
    //添加购物车
    const goCart = () => {
      addCart({goods_id: book.detail.id, num: 1}).then(res => {
        console.log(res)
        if (res && (res.status == '201' || res.status == '204')) {
          Toast.success('添加购物车成功');
          getCart().then(res => {
            store.dispatch('updateShopCartType');
            console.log(res)
          })

        }

      })
    };

    //添加收藏
    const collect = (id) => {
      doCollect(id).then(res => {

        if (res.status == '201') {
          isCollected.value = 1;
          Toast.success('收藏成功');
        }
        if (res.status == '204') {
          isCollected.value = 0;
          Toast.success('已取消收藏');
        }
      })

    }
    //立即购买
    const buyNow = () => {
      addCart({goods_id: book.detail.id, num: 1}).then(res => {
        if (res && (res.status == '201' || res.status == '204')) {

          getCart().then(res => {
            store.dispatch('updateShopCartType');
            router.push('/shopcart');
          })

        }

      })
    }

    function init(){
      getdetail(route.query.id).then(res => {
        book.detail = res.goods;
        book.like_goods = res.like_goods;
        isCollected.value = res.goods.is_collect;
        console.log(res)
      });
    }

    //初始化详情页面
    init();

    return {
      ...toRefs(book),
      activeName,
      collect,
      goCart,
      isCollected,
      buyNow

    }
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