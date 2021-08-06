<template>

  <!--      导航栏-->
  <navigator>分类</navigator>


<!--  左侧分类栏-->
  <van-sidebar v-model="activeKey" class="left">

    <van-collapse v-model="activeName" accordion class="lefttab">
      <van-collapse-item :title="cate.name" v-for="cate in catelist" :key="cate.id" class="clapitem">

        <van-sidebar-item :title="son.name" v-for="son in cate.children" :key="son.id"
                          @click="clickCateTab(son.id)"/>

      </van-collapse-item>
    </van-collapse>


  </van-sidebar>


<!--  上方分类栏-->
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
  @click="toDetail(item.id)"
          :key="item.id"
          :price="item.price+'.00'"
          :title="item.title"
          :thumb="item.cover_url"
      />
    </div>

  </scroll>
    <toup></toup>
</template>

<script>
import {getCateGoods, getCategory} from "@/network/category";
import Navigator from "@/components/common/navigator";
import {nextTick, onMounted, reactive, ref} from "vue";
import scroll from "@/components/common/scroll";
import Toup from "@/components/common/toup";
import {useRouter} from "vue-router";
import {Toast} from "vant";

export default {
  components: {Toup, Navigator, scroll},
  setup(){
    const router=useRouter();
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
      let page = ++(goods[curtab.value].page);
        Toast.loading({message:'加载中...',forbidClick:true,duration:0});
      getCateGoods(curtab.value, page, curcate.value).then(res => {
        goods[curtab.value].list.push(...(res.goods.data));
        nextTick(() => {
          scroll.value.refresh();
          Toast.clear();
        });

      })
    }

    let flag=0;
    Toast.loading({message:'加载中...',forbidClick:true,duration:0});
    //获取分类信息列表
    getCategory().then((res) => {
      catelist.value = res.categories;
      flag++;
      if(flag==4)
        Toast.clear();
    })


    //初始化列表
    {
      getCateGoods().then(res => {
        goods.sales.list = res.goods.data;
        nextTick(() => {
          scroll.value.refresh();
          flag++;
          if(flag==4)
            Toast.clear();
        })
      });
      getCateGoods('price').then(res => {
        goods.price.list = res.goods.data;
        flag++;
        if(flag==4)
          Toast.clear();
      });
      getCateGoods('comments_count').then(res => {
        goods.comments.list = res.goods.data;
        flag++;
        if(flag==4)
          Toast.clear();
      });
    }


    let tabs = ['sales', 'price', 'comments'];

    //切换排序分类
    const clicktab = (index) => {
      curtab.value = tabs[index];
      goods[curtab.value].page=1;
      // console.log('goods  ' + curcate.value + '排序  ' + curtab.value)
      Toast.loading({message:'加载中...',forbidClick:true,duration:0});
      getCateGoods(curtab.value, 1, curcate.value).then(res => {
        goods[curtab.value].list = res.goods.data;
        nextTick(() => {
          scroll.value.refresh();
          Toast.clear();
        })
      });
    }

    //切换商品id分类
    const clickCateTab = (id) => {
      Toast.loading({message:'加载中...',forbidClick:true,duration:0});
      curcate.value = id;
      goods[curtab.value].page=1;
      getCateGoods(curtab.value, 1, id).then(res => {
        goods[curtab.value].list = res.goods.data;
        nextTick(() => {
          scroll.value.refresh();
          Toast.clear();
        })
      });
      console.log('goods  ' + curcate.value + '排序  ' + curtab.value)
    }

    return {
      activeName, activeKey, catelist, active, clicktab, clickCateTab, goods, curtab,
      scroll,
      update,
      toDetail(id)
      {

        router.push({path:'/detail',query:{id}})

      }
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