<template>

  <!--      导航栏-->
  <navigator>分类</navigator>


  <van-sidebar v-model="activeKey" class="left">

    <van-collapse v-model="activeName" accordion class="lefttab">
      <van-collapse-item :title="cate.name" v-for="cate in catelist" :key="cate.id" class="clapitem">

        <van-sidebar-item :title="son.name" v-for="son in cate.children" :key="son.id"
                          @click="clickCateTab(son.id)"/>

      </van-collapse-item>
    </van-collapse>


  </van-sidebar>


  <div class="tab">
    <van-tabs v-model="active" @click="clicktab">
      <van-tab title="销量排序"></van-tab>
      <van-tab title="价格排序"></van-tab>
      <van-tab title="评价排序"></van-tab>
    </van-tabs>
  </div>


  <scroll :top="85"
          :left="120"
          :right="0"
          :bottom="62"
          :click="true"
          @pullingUp="update"
          :probe-type="3"
          ref="scroll">

    <div class="list">
      <van-card
          v-for="item in goods[curtab].list"
          :key="item.id"
          :price="item.price"
          :title="item.title"
          :thumb="item.cover_url"
      />
    </div>

  </scroll>
    <toup></toup>
</template>

<script>
import emitter from "@/utils/eventBus";
import {getCateGoods, getCategory} from "@/network/category";
import Navigator from "@/components/common/navigator";
import {nextTick, onMounted, reactive, ref} from "vue";
import scroll from "@/components/common/scroll";
import Toup from "@/components/common/toup";

export default {
  components: {Toup, Navigator, scroll},
  setup(){
    let scroll = ref(null);
    let activeName = ref('');
    let activeKey = ref('')
    let catelist = ref([]);
    let active = ref('');
    //排序分类
    let curtab = ref('sales');
    //商品id分类
    let curcate = ref(0);

    let goods = reactive({
      sales: {page: 1, list: []},
      price: {page: 1, list: []},
      comments: {page: 1, list: []}
    })


    //上拉刷新
      const update = () => {
        console.log(123)
      let page = ++(goods[curtab.value].page);
      getCateGoods(curtab.value, page, curcate.value).then(res => {
        goods[curtab.value].list.push(...(res.goods.data));
        nextTick(() => {
          scroll.value.refresh();
        })
      })
    }

    //获取分类信息列表
    getCategory().then((res) => {
      catelist.value = res.categories;
    })


    //初始化列表
    {
      getCateGoods().then(res => {
        goods.sales.list = res.goods.data;
        nextTick(() => {
          scroll.value.refresh();
        })
      });
      getCateGoods('price').then(res => {
        goods.price.list = res.goods.data;
      });
      getCateGoods('comments_count').then(res => {
        goods.comments.list = res.goods.data;
      });
    }


    let tabs = ['sales', 'price', 'comments'];

    //切换排序分类
    const clicktab = (index) => {
      curtab.value = tabs[index];
      goods[curtab.value].page=1;
      console.log('goods  ' + curcate.value + '排序  ' + curtab.value)
      getCateGoods(curtab.value, 1, curcate.value).then(res => {
        goods[curtab.value].list = res.goods.data;
        nextTick(() => {
          scroll.value.refresh();
        })
      });
    }

    //切换商品id分类
    const clickCateTab = (id) => {

      curcate.value = id;
      goods[curtab.value].page=1;
      getCateGoods(curtab.value, 1, id).then(res => {
        goods[curtab.value].list = res.goods.data;
        nextTick(() => {
          scroll.value.refresh();
        })
      });
      console.log('goods  ' + curcate.value + '排序  ' + curtab.value)
    }

    return {
      activeName, activeKey, catelist, active, clicktab, clickCateTab, goods, curtab,
      scroll,
      update
    }
  }
}
</script>

<style scoped lang="scss">


.left {
  float: left;
  width: 120px;
  height: calc(100vh - 107px);

  .lefttab {
    margin-top: 40px;
  }

}


.tab {
  position: relative;
  z-index: 1;
  float: left;
  height: 40px;
  width: calc(100vw - 120px);
}

.list {
  width: 100%;
}


</style>