<template>
  <navigator>订单详情</navigator>

  <div class="top">
    <div>
      <span class="label">订单状态：</span>
      {{statusString}}
    </div>
    <div>
      <span class="label">订单编号：</span>
      {{order_no}}
    </div>
    <div>
      <span class="label">下单时间：</span>
      {{created_at}}
    </div>

    <van-button  v-if="status=='1'" @click="goPay"
        style="width: 80%;margin:10px auto" block color="linear-gradient(to right, #ff6034, #ee0a24)">去支付</van-button>

    <van-button  v-if="status=='3'"
        style="width: 80%;margin:10px auto" block color="linear-gradient(to right, #ff6034, #ee0a24)">确认收货</van-button>



  </div>
 <van-divider/>
  <div class="mid">
    <div>
      <span class="label">商品总额：</span>
     <small>￥</small> {{total}}
    </div>

    <div>
      <span class="label">配送方式：</span>
      普通快递
    </div>
  </div>

  <van-divider  content-position="left">订单中商品</van-divider>
  <van-card @click="$router.push({path:'/detail',query:{id:goods[index].id}})"
      v-for="(item,index) in goodsOrder"
      style="font-size: 15px;box-shadow: var(--shadow-down);width: 95%;margin:10px auto;border-radius: 10px"
      :num="item.num"
      :price="item.price"
      :desc="goods[index].description"
      :title="goods[index].title"
            :key="item.id"
  :thumb="goods[index].cover_url"/>


  <van-popup v-model:show="show"
             closeable @close="onClose" :close-on-click-overlay="false" round position="bottom"
             :style="{ height: '35%' }">

    <van-grid :border="false" :column-num="1">
      <van-grid-item>
        支付宝支付
        <van-image :src="aliyun"/>
      </van-grid-item>
    </van-grid>

  </van-popup>

</template>

<script>
import Navigator from "@/components/common/navigator";
import {computed, reactive, toRefs} from "vue";
import {useRouter,useRoute} from "vue-router";
import {orderDetail, orderPay} from "@/network/order";
export default {
  components: {Navigator},
  setup() {
    const router=useRouter();
    const route=useRoute();
      let state=reactive({
          orderId:0,
    created_at:'',
        goods:[],
        goodsOrder:[],
        order_no:0,
        //订单状态: 1下单 2支付 3发货 4收货 5过期
        status:0,
        show:false,
        aliyun:''
      })
    state.orderId=route.query.id;
    const init=()=>{
        orderDetail(state.orderId,{include:'goods,user,orderDetails'}).then(res=>{
          console.log(res);
          state.goods=res.goods.data;
          state.goodsOrder=res.orderDetails.data;
          state.status=res.status;
          state.created_at=res.created_at;
          state.order_no=res.order_no;

        })
    }
    let statusString=computed(()=>{
      let a=['','已下单','已支付','已发货','已收货','已过期'];
      return a[state.status];
    })
    init();

    let total=computed(()=>{
      let sum=0;
      state.goodsOrder.forEach((e)=>{
        sum+=e.price*e.num;
      })
      return sum;
    })

    const goPay=()=>{
      state.show=true;

      orderPay(parseInt(state.orderId), {type: 'aliyun'}).then(r => {
        state.aliyun = r.qr_code_url;
        //展示二维码后，用户扫码，轮询该订单状态，如果服务器返回2，表示已支付，跳去别的页面
        // ,弹出层也可以直接关闭，表示不支付，跳去订单详情，在订单详情里有可以支付，
        // let timer=setInterval(()=>{
        //   orderQuery(state.order_id).then(res=>{
        //     console.log(res);
        //
        //   })
        //
        // },2000)
      })
    }
    const onClose=()=>{
      init();
    }
    return {
        ...toRefs(state),statusString,total,goPay,onClose
    }
  }
}
</script>

<style scoped lang="scss">
* {
  line-height: 25px;

}
.top {
  margin:10px 20px 20px;
}
.label {
  color:#888888;
  font-size: 15px;
}
.mid {
  margin:0 20px;
}
</style>