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

export default {
  components: {Booklist, TabControl, Recommend, Banner, Navigator},
  setup() {
    let isshow = ref(false);
    let tabref = ref(null);
    let store = useStore();
    const recommend = ref([]);
    let booklist = reactive({
      sales: {books: [], index: 1},
      new: {books: [], index: 1},
      recommend: {books: [], index: 1},
    });

    let tofix = ref(false);

    let t = computed(() => store.state.curtab);

    //更新列表数据
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
      // console.log("curbooklist    " + curtabWord)
      let curType = booklist[curtabWord];

      curType.index++;
      let curindex = curType.index;
      // console.log('curindex       '+ curindex);
      getGoodsList(curindex, curtabWord).then(res => {

        nextTick(() => {
          curType.books = curType.books.concat(res.goods.data);
        })


      })

    }


    onMounted(() => {
      getHomeData().then((res) => {
            recommend.value = res.goods.data;
          }
      );


      getGoodsList(1, 'sales').then((res) => {
        booklist.sales.books = res.goods.data;

      });
      getGoodsList(1, 'recommend').then((res) => {
        booklist.recommend.books = res.goods.data;
      });
      getGoodsList(1, 'new').then((res) => {
            booklist.new.books = res.goods.data;
          }
      )


      BScroll.use(Pullup);
      let bs = new BScroll(document.querySelector('.wrapper'), {
        click: true,
        probeType: 3,
        pullUpLoad: true
      });
      const elposition = document.querySelector('.out').getBoundingClientRect().y;
      bs.on('scroll', (p) => {

        console.log(elposition)
        console.log("y    " + (-p.y))
        if ((-p.y) > (elposition - 45)) {
          console.log("ok`````````````````````")
          isshow.value = true;
        } else isshow.value = false;
      });

      function handleScroll() {
        // console.log("pulling")
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

<style>
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

* {
  margin-left: 10px;
  margin-right: 10px;
}

</style>