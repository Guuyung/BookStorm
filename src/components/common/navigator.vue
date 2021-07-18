<template>
<!--  上方导航-->
  <div class="pad"></div>
  <div class="container">
    <div class="left" >
      <slot name="left" ><img src="~assets/images/arrow.png" @click="back"></slot>
    </div>
    <div class="middle">
      <slot><span>Book Storm</span></slot>
    </div>

    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>

</template>

<script>
import {useRouter} from 'vue-router'

export default {

  setup() {
    const router = useRouter();
    const back = () => router.go(-1);

    return {
      back
    }
  }
}
</script>

<style scoped lang="scss">
.pad {
  width: 100%;
  height: 45px;
}
.container {
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 2;
  height: 45px;
  background: var(--color-strong);
  display: flex;
  color: #FFFFFF;
  font-size: 17px;
  line-height: 45px;
  text-align: center;
  font-size: 20px;
  box-shadow: 0 3px 11px #888888;
}

.left img {
  width: 45px;
  padding: 8px;
}

.left, .right {
  width: 70px;
}

.middle {
  flex: 1;
}

</style>