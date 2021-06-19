<template>
  <div>
      <div class="box" @scroll=""></div>
  </div>
</template>

<script>
export default {
  methods:{
    handleScroll()
    {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      console.log("window.pageYOffset                           "+ window.pageYOffset )

    }
  },
  mounted () {

    window.addEventListener('scroll', this.handleScroll)
  },


}
</script>

<style scoped>
  .box {
    overflow: scroll;
    height: 100vh;
    background-color: blue;
  }
</style>