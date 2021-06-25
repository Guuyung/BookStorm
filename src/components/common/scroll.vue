<template>
  <div class="wrapper" ref="wrapperref"
       :style="{top:top+'px',left:left+'px',right:right+'px',bottom:bottom+'px'}">
  <div class="content">
    <slot></slot>
  </div>
  </div>
</template>

<script>
import {debounce} from "@/utils/debounce";
import Pullup from '@better-scroll/pull-up'
import BScroll from '@better-scroll/core'
import {nextTick, onMounted, reactive, ref, watch} from "vue";
import emitter from "@/utils/eventBus";
export default {
  created()
  {
    emitter.on('toTop',()=>{
      this.bscroll.scrollTo(0,0,500);
    })
  },
  props:{
    top:{
      type:Number,
      require:true
    },
    left:{
      type:Number,
      require:true
    },
    right:{
      type:Number,
      require:true
    },
    bottom:{
      type:Number,
      require:true
    },
    probeType:{
      type:Number,
      default:1
    },
    click:{
      type:Boolean,
      default: true
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  methods:{
    refresh()
    {
      this.bscroll.refresh();
    },

  },
  data()
  {
    return {
      bscroll:null
    }
  },
  mounted() {
    //需要声明全面使用上滑插件
    BScroll.use(Pullup);
    let bs = new BScroll(this.$refs.wrapperref, {
      click: this.click,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    this.bscroll=bs;
    //监控滚动
    bs.on('scroll', (p) => {
      this.$emit('myscroll',p);
      //同时向其他组件发射滚动信号与位置信息
      emitter.emit('onscroll',p);
    });

    bs.on('pullingUp',()=>{
      this.$emit('pullingUp');
      bs.finishPullUp();
    });

  }

}
</script>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  top: 45px;
  bottom: 62px;
  left: 0;
  right: 0;
  z-index: 0;
}
</style>