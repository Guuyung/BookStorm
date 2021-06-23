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


    <scroll :probe-type="3" :pull-up-load="true" :click="true"
            @myscroll="onScroll" @pullingUp="onpullup" ref="scrollel">


      <banner></banner>

      <!--    推荐栏-->
      <recommend :recommend="recommend"></recommend>

      <div ref="tabref" class="out">
        <!--    控制选项卡-->
        <tab-control :options="['畅销','新书','精选']" class="tabcontrol"
                     :style="{visibility:isshow?'hidden':'visible'}"></tab-control>
      </div>

      <!--    书列表-->
      <booklist class="booklist" :booklist="booklist"></booklist>

    </scroll>


    <!--    坐火箭-->
    <toup v-show="showtop" @click="toTop"></toup>

  </div>
</template>

<script>
import Navigator from "@/components/common/navigator";
import Banner from "@/views/home/banner";
import {getHomeData, getGoodsList} from "@/network/home";
import {ref, reactive, onMounted, computed, watch, nextTick} from 'vue'
import Recommend from "@/views/home/recommend";
import TabControl from "@/components/common/tabControl";
import Booklist from "@/components/common/books/booklist";
import {useStore} from "vuex";
import Toup from "@/components/common/toup";
import Scroll from "@/components/common/scroll";
import emitter from "@/utils/eventBus";
import {debounce} from "@/utils/debounce";

export default {
  methods: {
    onpullup() {
      console.log('get pullup``````````````````````')
    }
  },
  components: {Scroll, Toup, Booklist, TabControl, Recommend, Banner, Navigator},
  setup() {
    let showtop=ref(false);
    let scrollel = ref(null);
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
      let curType = booklist[curtabWord];

      curType.index++;
      let curindex = curType.index;
      // console.log(`当前选项卡 ${curtabWord}   当前页数 ${curindex}`);
      getGoodsList(curindex, curtabWord).then(res => {

        nextTick(() => {
          console.log(res.goods.data)
          curType.books.push(...(res.goods.data));
        })


      })

    }

    let onScroll = (p) => {
      console.log(-p.y)
      if ((-p.y) > (elposition - 50)) {
        isshow.value = true;
      } else
        isshow.value = false;

      if((-p.y)>1000)
      {
        console.log('ok')
        showtop.value=true;
      }
      else
        showtop.value=false;



    };
    let deupdate = debounce(updateBookList,50);

    let onpullup = () => {
      deupdate();
      console.log(scrollel.value)
      scrollel && scrollel.value.refresh();
    };

    const toTop=()=>{
      console.log(scrollel.value)
      console.log((scrollel.value).scrollTo)
      scrollel&&(scrollel.value.bscroll).scrollTo(0,0,500);
    }
    let elposition = 0;

    onMounted(() => {
      let n = 1;
      emitter.on('imgloaded', () => {
        if (n % 10 == 0) {
          scrollel && scrollel.value.refresh();
        }
        n++;
      })

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


      watch(t, () => {

        nextTick(() => {
          scrollel && scrollel.value.refresh();
        })
      })

      elposition = document.querySelector('.out').getBoundingClientRect().y;

    })


    return {
      recommend,
      booklist,
      tabref,
      isshow,
      scrollel,
      onScroll,
      onpullup,
      showtop,
      toTop
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


.tabcontrol {
  /*margin-top: 10px;*/
}

.booklist {
  margin-top: 11px;
}


</style>