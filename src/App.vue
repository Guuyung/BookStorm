<template>


<!--  <test ref="te" @click="test" age-time="通天塔xxx"></test>-->
  <navbar ></navbar>
    <div class="navbox">
    </div>
</template>

<script>

  import test from './test.vue'
  import navbar from 'components/common/navbar.vue'
  import {onMounted, reactive, ref} from "vue";
  export default {
    components:{test,navbar},
  }
</script>

<style scoped>
@import '~assets/css/base.css';
  .a {
    color: var(--color-high-text);
  }
  .navbox {
    height: 62px;
    width: 100%;
  }
</style>

<style>

</style>