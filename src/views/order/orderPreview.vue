<template>
  <navigator>订单预览</navigator>

  <template v-if="noDefault">
    <van-contact-card type="add" @click="$router.push('/addresslist')"
                      style="background: var(--color-weak);width: 95%;margin: 10px auto;
                        box-shadow: var(--shadow-down);color: ghostwhite;border-radius: 15px"
    />
    <van-empty description="您还未添加收件人与地址哦..." type="error"></van-empty>
  </template>

  <van-contact-card
      v-if="!noDefault"
      type="edit"
      :name="name"
      :tel="tel"
      @click="$router.push({path:'/addresslist'})"

      style="background: var(--color-weak);width: 95%;margin: 10px auto;
                        box-shadow: var(--shadow-down);color: ghostwhite;border-radius: 15px"
  />

  <van-divider content-position="left" v-if="!noDefault">已选商品</van-divider>
  <van-card
      v-for="item in catrs"
      :num="item.num"
      :price="item.goods.price+'.00'"
      :title="item.goods.title"
      :thumb="item.goods.cover_url"
      style="font-size: 16px"
  />


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

  <van-submit-bar v-if="!noDefault" :price="total*100" button-text="结算"
                  @submit="onSubmit" style="box-shadow: var(--shadow-down)"/>
</template>

<script>
import Navigator from "@/components/common/navigator";
import {orderPay, orderPost, orderPreview, orderQuery, testaa} from "@/network/order";
import {onMounted, reactive, toRefs} from "vue";
import {load} from "@/utils/message";
import {Toast} from "vant";
import {useStore} from "vuex";
import test from "@/test";
import router from "@/router";
import {useRouter} from "vue-router";

export default {
  components: {Navigator},
  setup() {
    const store = useStore();
    let state = reactive({
      noDefault: false,
      name: '',
      tel: '',
      id: 0,
      defaultAddress: {},
      catrs: [],
      total: 0,
      show: false,
      aliyun: '',
      wechat: '',
      //订单的id,不是订单编号
      order_id: 0
    });


    const init = () => {
      orderPreview().then(res => {
        console.log(res)
        if (res.address.length == 0 || res.address[0].is_default == 0) {
          state.noDefault = true;
          return;
        }
        res.address[0].is_default == 0;

        state.name = res.address[0].name;
        state.tel = res.address[0].phone;
        state.id = res.address[0].id
        state.defaultAddress = res.address[0];
        state.catrs = res.carts;

        res.carts.forEach(i => {
          state.total += i.goods.price * i.num;
        })

      })
    }

    init();

    const onSubmit = () => {
      if (state.catrs.length == 0) {
        Toast.fail('还没有选中任何商品哦...');
        return;
      }
      state.show = true;
      orderPost({address_id: state.id}).then(res => {
        console.log(res);
        state.order_id = res.id;

        if ('order_no' in res) {
          //下单成功，发送支付请求,用户扫码成功支付后后台订单状态会改变
          orderPay(parseInt(res.id), {type: 'aliyun'}).then(r => {
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
            store.dispatch('updateShopCartType');
          })
        }


      })
    }
const router=useRouter();
const onClose=()=>{
      router.push({path:'/orderdetail',query:{id:state.order_id}});

}
    return {
      ...toRefs(state), onSubmit, onClose

    }
  }
}
</script>

<style scoped lang="scss">
.van-submit-bar {
  position: fixed;
  bottom: 62px;
  right: 0px;
  z-index: 1;
  background-color: WhiteSmoke;

}

</style>