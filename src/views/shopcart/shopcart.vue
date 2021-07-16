<template>

        <navigator>购物车 ( <span style="color: antiquewhite"> {{ $store.state.shopCart.type }} </span> )</navigator>

<!--      购物车为空提示-->
      <div v-if="$store.state.shopCart.type==0">
        <img src="@/assets/images/emptyShopCart.jpg" style="width: 100%;height: auto">
        <p style="color:#42b983;font-size: 30px;text-align: center">购物车空空的...</p>
        <p style="color:#42b983;font-size: 30px;text-align: center;line-height: 45px">去随便看看吧</p>
      </div>


  <scroll :bottom="112" :pullUpLoad="false">
    <van-swipe-cell>
      <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          class="goods-card"
          thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>

    <van-swipe-cell>
      <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          class="goods-card"
          thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>    <van-swipe-cell>
    <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" />
    </template>
  </van-swipe-cell>    <van-swipe-cell>
    <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" />
    </template>
  </van-swipe-cell>    <van-swipe-cell>
    <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" />
    </template>
  </van-swipe-cell>    <van-swipe-cell>
    <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" />
    </template>
  </van-swipe-cell>    <van-swipe-cell>
    <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" />
    </template>
  </van-swipe-cell>    <van-swipe-cell>
    <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" />
    </template>
  </van-swipe-cell>

  </scroll>




  <van-submit-bar :price="13533" button-text="提交订单" style="margin-bottom: 62px;background-color:WhiteSmoke;" @submit="onSubmit" />

</template>

<script>
    import Navigator from "@/components/common/navigator";
    import {Toast} from "vant";
    import {useRouter} from "vue-router";
    import {useStore} from "vuex";
    import scroll from '@/components/common/scroll'
    export default {
      components: {Navigator,scroll},
      setup()
      {
        const router=useRouter();
        const store=useStore();

        const onSubmit=()=>{

        }
        return {
          onSubmit
        }
      }
    }
</script>

<style scoped lang="scss">
.goods-card {
  margin: 0;
  background-color: WhiteSmoke;
}

.delete-button {
  height: 100%;
}
</style>