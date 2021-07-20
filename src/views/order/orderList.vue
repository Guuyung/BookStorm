<template>

  <navigator>订单列表</navigator>
  <tab-control :options="['全部','待付款','已支付','已发货','交易完成','已过期']" style="position:fixed;top:50px;width:95%"></tab-control>

  <div style="height: 50px;width: 100%"></div>

  <!--    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">-->
  <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >

<!--  整个订单块-->
    <template v-for="item in list" >
    <div class="order" v-if="item.orderDetails.data.length!=0"
         @click="$router.push({path:'/orderdetail',query:{id:item.id}})">


      <div class="label">订单编号：</div>
      <span class="content">{{ item.order_no }}</span> <br/>
      <div class="label">创建时间：</div>
      <span class="content">{{ item.created_at }}</span><br/>
      <van-card v-for="(e,i) in item.orderDetails.data"
                style="font-size: 15px;border-radius: 10px;width: 95%;margin:10px auto"
                :num="e.num"
                :price="e.goods.price+'.00'"
                :desc="e.goods.description"
                :title="e.goods.title"
                :thumb="e.goods.cover_url"

      />


    </div>

    </template>

  </van-list>

  <!--    </van-pull-refresh>-->


</template>

<script>
import Navigator from "@/components/common/navigator";
import {computed, reactive, toRefs, watch, watchEffect} from "vue";
import TabControl from "@/components/common/tabControl";
import {useStore} from "vuex";
import {orderList} from "@/network/order";
import Toup from "@/components/common/toup";

export default {
  components: {Toup, TabControl, Navigator},
  setup() {

    let store = useStore();
    let state = reactive({
      s:true,
      error: false,
      loading: false,
      finished: false,
      list: [],
      refreshing: '',
      totalPages: 0,
      curPage: 1,
      created_at: '',
      order_no: ''
    })

    const init = () => {
      orderList({page: 1, status: parseInt('1'), include: 'orderDetails.goods'}).then(res => {
        console.log(res);
        state.list = res.data;
        state.totalPages=res.meta.pagination.total_pages;
      })
    }
    init();
    let active = computed(() =>
        store.state.curtab
    )

    watchEffect(()=>{

    })

    const onLoad = () => {
        if(state.curPage==state.totalPages)
        {
          state.finished=true;
          return;
        }

      orderList({page:++state.curPage,status: parseInt('1'), include: 'orderDetails.goods'}).then(res=>{
        console.log(res);
        console.log(res.meta.pagination.current_page)
        state.list.push(...res.data);
        state.curPage=res.meta.pagination.current_page;
        state.loading=false;
      })
      console.log(state.loading)
    }

    const onRefresh = () => {

    }

    watch(active, () => {


    })

    return {
      ...toRefs(state),
      onLoad,
      onRefresh,
    }
  }
}
</script>

<style scoped lang="scss">
.order {
  overflow: hidden;
  margin: 15px auto;
  width: 95%;
  border-radius: 15px;
  background: #F2F2F2;
  box-shadow: var(--shadow-down);
  .label {
    margin-top: 10px;
    display: inline-block;
    line-height: 22px;
    margin-left: 20px;
    color: #888888;
    font-size: 15px;
  }

}
</style>