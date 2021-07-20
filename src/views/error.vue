<template>
  <div>
    <navigator>404</navigator>

    <van-empty description="你来到了一个荒无人烟的地方哦..." image="error"></van-empty>
  </div>
  <van-button round block style="color:#FFFFFF;font-size: 18px;
   background: var(--color-strong);
   width: 50%;
   margin:100px auto;

   "
              @click="$router.push('/home')"
  >去随便看看吧
  </van-button>





</template>

<script>
import navigator from "@/components/common/navigator";

export default {
  components: {navigator},
  setup() {

  }
}
</script>

<style scoped lang="scss">

</style>