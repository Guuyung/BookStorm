<template>
  <div class="bookitem">
    <img src="~assets/images/b.png" alt="">
    <p class="title">标题</p>
    <div class="info">


    <div class="price">￥ 价格</div>
    <div class="collection">
      <img src="~assets/images/collect.png" alt="">
      <span class="collectnum">3</span>
    </div>

    </div>

  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">

  .bookitem {
    position: relative;

    width: 46%;
    img {
      width: 100%;
    }
    .title {
      text-align: center;
      display: block;
      padding: 3px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info{

      display: flex;


      .price {

       text-align: center;
        flex: 1;
        color: red;
        padding-left: 5px;
        display: inline-block;
      }

      .collection {

        flex: 1;
        img {
          margin: 0px 3px;
          width: 14px;

        }


        .collectnum {
          padding-left: 5px ;
        }

      }

    }








  }
</style>