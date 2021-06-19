<template>
  <div>

    <!--      导航栏-->
    <navigator>
      <template v-slot:default>Book Storm</template>
      <template v-slot:left>
        <div></div>
      </template>
    </navigator>

    <!--      banner-->
    <banner></banner>

    <!--    推荐栏-->
    <recommend :recommend="recommend"></recommend>

<!--    控制选项卡-->
    <tab-control  :top="45" :options="['畅销','新书','精选']" @tabclick="tabclick" class="tabcontrol"></tab-control>


<!--    书列表-->
    <booklist></booklist>

  </div>
</template>

<script>
import Navigator from "@/components/common/navigator";
import Banner from "@/views/home/banner";
import {getHomeData} from "@/network/home";
import {ref, onMounted} from 'vue'
import Recommend from "@/views/home/recommend";
import TabControl from "@/components/common/tabControl";
import Booklist from "@/components/common/books/booklist";

export default {
  components: {Booklist, TabControl, Recommend, Banner, Navigator},
  setup() {
    const recommend = ref([]);
    let curindex=ref(0);


    onMounted(() => {
      getHomeData().then((res) => {
            recommend.value = res.goods.data;
          }
      )
    })

    let tabclick=(index)=>{
      curindex.value=index;
    }

    return {
      recommend,curindex,tabclick
    }
  }
}
</script>

<style>
* {
  margin-left: 10px;
  margin-right: 10px;
}

</style>