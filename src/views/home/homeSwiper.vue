<template>
  <div class="container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banner"><img :src="item.img_url"></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props:{
    banner:{
      type: Array,
      default:()=>[]
    }
  },
  setup() {

  }
}
</script>

<style scoped lang="scss">

.container {

  img {
    width: 100%;

  }
}

</style>