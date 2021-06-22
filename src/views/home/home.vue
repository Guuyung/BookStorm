<template>
  <div>

    <!--      顶部导航栏-->
    <navigator>
      <template v-slot:default>Book Storm</template>
      <template v-slot:left>
        <!--        用div来占位默认的返回键，首页不需要返回键的显示-->
        <div></div>
      </template>
    </navigator>

    <tab-control class="fixTabcontrol" :options="['畅销','新书','精选']" v-show="isshow"></tab-control>


    <!--      banner-->
    <div class="wrapper">

      <div class="content">
        <banner></banner>

        <!--    推荐栏-->
        <recommend :recommend="recommend"></recommend>

        <div ref="tabref" class="out" v-show="!isshow">
          <!--    控制选项卡-->
          <tab-control :options="['畅销','新书','精选']" class="tabcontrol"></tab-control>
        </div>

        <!--    书列表-->
        <booklist class="booklist" :booklist="booklist"></booklist>
      </div>

    </div>

    <toup></toup>

  </div>
</template>

<script>
import Pullup from '@better-scroll/pull-up'
import BScroll from '@better-scroll/core'
import Navigator from "@/components/common/navigator";
import Banner from "@/views/home/banner";
import {getHomeData, getGoodsList} from "@/network/home";
import {ref, reactive, onMounted, computed, watch, nextTick} from 'vue'
import Recommend from "@/views/home/recommend";
import TabControl from "@/components/common/tabControl";
import Booklist from "@/components/common/books/booklist";
import {useStore} from "vuex";
import Toup from "@/components/common/toup";

export default {
  components: {Toup, Booklist, TabControl, Recommend, Banner, Navigator},
  setup() {
    let isshow = ref(false);
    let tabref = ref(null);
    let store = useStore();
    const recommend = ref([]);
    let booklist = reactive({
      sales: {books: [], index: 0},
      new: {books: [], index: 0},
      recommend: {books: [], index: 0},
    });


    let t = computed(() => store.state.curtab);

    //处理上滑事件，更新列表数据
    function updateBookList() {
      let curtabWord = '';
      switch (t.value) {
        case 0:
          curtabWord = 'sales';
          break;
        case 1:
          curtabWord = 'new';
          break;
        case 2:
          curtabWord = 'recommend';
          break;
      }
      // console.log("当前选项卡    " + curtabWord)
      let curType = booklist[curtabWord];

      curType.index++;
      let curindex = curType.index;
      console.log(`当前选项卡 ${curtabWord}   当前页数 ${curindex}`);
      getGoodsList(curindex, curtabWord).then(res => {

        nextTick(() => {
          console.log(res.goods.data)
          curType.books.push(...(res.goods.data));
        })


      })

    }


    onMounted(() => {

      //获取推荐数据
      getHomeData().then((res) => {
            recommend.value = res.goods.data;
          }
      );

      //获取图书列表的初始值
      function initBookList() {
        getGoodsList(1, 'sales').then((res) => {
          booklist.sales.books = res.goods.data;

        });

        getGoodsList(1, 'recommend').then((res) => {
          booklist.recommend.books = res.goods.data;
        });
        getGoodsList(1, 'new').then((res) => {
          booklist.new.books = res.goods.data;
        });
      }

      initBookList();


      //需要声明全面使用上滑插件
      BScroll.use(Pullup);
      let bs = new BScroll(document.querySelector('.wrapper'), {
        click: true,
        probeType: 2,
        pullUpLoad: true,

      });

      watch(t, () => {
        nextTick(() => {
          console.log('reflash')
          bs.refresh();
        })
      })

      //获取选项卡当前距离视口顶部距离
      const elposition = document.querySelector('.out').getBoundingClientRect().y;

      //监控滚动
      bs.on('scroll', (p) => {

        // console.log(elposition)
        // console.log("y    " + (-p.y))
        if ((-p.y) > (elposition - 45)) {
          // console.log("ok`````````````````````")
          isshow.value = true;
        } else
          isshow.value = false;
      });
      let pullupcount = 0;

      function handleScroll() {
        pullupcount++;
        console.log('上拉刷新次数' + pullupcount);
        updateBookList();
        bs.finishPullUp();
        bs.refresh();
      };


      bs.on('pullingUp', handleScroll);

    })


    return {
      recommend, booklist, tabref, isshow
    }
  }
}
</script>

<style scoped>
.fixTabcontrol {
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
}

.wrapper {
  position: fixed;
  top: 45px;
  bottom: 62px;
  left: 0;
  right: 0;
  z-index: 0;
}

.tabcontrol {
  margin-top: 10px;
}

.booklist {
  margin-top: 11px;
}



</style>