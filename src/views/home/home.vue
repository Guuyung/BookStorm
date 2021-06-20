<template>
  <div>

    <!--      导航栏-->
    <navigator>
      <template v-slot:default>Book Storm</template>
      <template v-slot:left>
<!--        用div来占位默认的返回键，首页不需要返回键的显示-->
        <div></div>
      </template>
    </navigator>

    <!--      banner-->
    <banner></banner>

    <!--    推荐栏-->
    <recommend :recommend="recommend"></recommend>

<!--    控制选项卡-->
    <tab-control  :toplength="45" :options="['畅销','新书','精选']"  class="tabcontrol"></tab-control>


<!--    书列表-->
    <booklist class="booklist"></booklist>

  </div>
</template>

<script>
import Navigator from "@/components/common/navigator";
import Banner from "@/views/home/banner";
import {getHomeData,getGoodsList} from "@/network/home";
import {ref, reactive,onMounted} from 'vue'
import Recommend from "@/views/home/recommend";
import TabControl from "@/components/common/tabControl";
import Booklist from "@/components/common/books/booklist";

export default {
  components: {Booklist, TabControl, Recommend, Banner, Navigator},
  setup() {
    const recommend = ref([]);



    onMounted(() => {
      getHomeData().then((res) => {
            recommend.value = res.goods.data;
          }
      );

    })


    return {
      recommend
    }
  }
}
</script>

<style>
.tabcontrol {
  margin-top: 10px;
}
.booklist {
  margin-top: 11px ;
}
* {
  margin-left: 10px;
  margin-right: 10px;
}

</style>