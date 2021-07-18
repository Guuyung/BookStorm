<template>

    <navigator>我的收藏</navigator>


  <van-empty v-if="collections.length==0" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" description="收藏空空哦..." />

  <van-card
      v-for="item in collections"
      :key="item.goods.id"
      :price="item.goods.price"
      :desc="item.goods.description"
      :title="item.goods.title"
      :thumb="item.goods.cover_url"
      style="font-size: 16px;"
      @click="$router.push('/detail?id='+item.goods.id)"
  >
  <template #footer>
    <van-button color=" linear-gradient(to bottom,#41C7AF,#54E38E)" @click.stop="cancel(item.goods.id)">{{item.id=='c'?'收藏':'取消收藏' }}</van-button>
  </template>

</van-card>
  <div class="padding" style="height: 40px;width: 100%"></div>

  <van-pagination v-if="collections.length!=0" v-model="curPage" :page-count="totalPage"  mode="simple"
                  @change="changePage" style="position: fixed;width: 100%;bottom:62px;background: #FFFFFF"/>

</template>
<script>
import Navigator from "@/components/common/navigator";
import {reactive, ref, toRefs, watch, watchEffect} from "vue";
import {doCollect, getCollections} from "@/network/collection";
import {Toast} from "vant";
import {close, sucLoad} from "@/utils/message";
export default {
  components: {Navigator},
  setup() {
      let collections=ref([]);
      let info=reactive({
        totalPage:0,
        curPage:0,
        total:0
      });

      const changePage=(n)=>{
        sucLoad('加载成功')
      getCollections(n).then(res=>{
        console.log('page',res);
        collections.value=[];
        collections.value=res.data;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        Toast.clear();
      })


      }

      const cancel=(id)=>{
        sucLoad();
        doCollect(id).then(res=>{
          console.log(res)
          if(res.status=='204')
          {
            collections.value.forEach(e=> {
              if (e.goods_id == id) {
                e.id='c';
              }
            })
            Toast.clear();
          }
          if(res.status=='201')
          {
            collections.value.forEach(e=> {
              if (e.goods_id == id) {
                e.id='b';
              }
            })
            Toast.clear();
          }
        })
      };
      // watchEffect(()=>{
      //   console.log(info.curPage)})

      const init=()=>{
        sucLoad('加载成功')
        getCollections().then(res=>{
          console.log(res);
          collections.value=res.data;
          //当前页数
          info.curPage=res.meta.pagination.current_page;
          //总共的页数
          info.totalPage=res.meta.pagination.total_pages;
          //当前页数的条数
          info.total=res.meta.pagination.total;
          console.log(info)
          Toast.clear()
        });
      }

      init()

      return {
        collections,
        ...toRefs(info),
        cancel,
        changePage
      }
  }
}
</script>

<style scoped lang="scss">

</style>