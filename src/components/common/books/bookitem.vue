<template>
  <div class="bookitem" @click="toDetail(id)">
    <div class="imgbox">

      <img :src="imgsrc" class="bookimg" @load="imgload">
    </div>

    <div class="info">

      <div class="title">{{ title }}</div>

      <div class="price">￥ {{ price }}</div>

      <div class="collection">
        收藏数
        <img src="~assets/images/collect.png" alt="">
        <span class="collectnum">{{ collectNum }}</span>
      </div>

    </div>

  </div>
</template>

<script>
import {debounce} from "@/utils/debounce";
import emitter from "@/utils/eventBus";
import {useRouter} from "vue-router";

export default {

  props: {
    id:{
      type:Number,
      default:0
    },
    imgsrc: {
      type: String,
      default: ""
    },
    price: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ""
    },
    collectNum: {
      type: Number,
      default: 0
    }

  },
  setup() {
    const router=useRouter();
    function loaded() {
      emitter.emit('imgloaded');
    }

    let imgload = debounce(loaded
        ,100
    )

    return {
      imgload,
      toDetail(id)
      {
        console.log(id)

        router.push({path:'/detail',query:{id}})
      }
    }
  },


}
</script>

<style scoped lang="scss">

.bookitem {
  position: relative;

  width: 46%;
  height: 36vh;

  .imgbox {
    width: 100%;
    height: 70%;
    border-radius: 5px;

    .bookimg {
      width: 100%;
      height: 100%;
    }
  }


  .info {
    display: flex;
    justify-content: center;
    flex-direction: column;

    .title {
      text-align: center;
      width: 100%;
      display: block;
      padding: 3px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .price {
      text-align: center;
      color: red;
      padding: 5px
    }

    .collection {
      text-align: center;

      img {
        margin: 0px 3px;
        width: 14px;

      }


      .collectnum {
        padding-left: 5px;
      }

    }

  }


}
</style>