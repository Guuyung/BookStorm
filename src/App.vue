<template>

    <navbar ></navbar>
<!--  <test></test>-->
    <div class="navbox">
    </div>

</template>

<script>
  import test from './test.vue'
  import navbar from 'components/common/navbar.vue'
  export default {
    components:{test,navbar}
  }
</script>

<style>
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