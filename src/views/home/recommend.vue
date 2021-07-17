<template>

    <div class="showbook" >
      <div class="book" v-for="item in recommend.slice(0,4)" :key="item.id" @click="goDetail(item.id)">
          <img :src="item.cover_url" >
          <div class="title">{{item.title}}</div>
      </div>

    </div>




</template>

<script>
import {useRouter} from 'vue-router'
export default {

  setup()
  {
    let router=useRouter();
    const goDetail=(id)=>{
      console.log(id)
      router.push({path:'/detail',query:{id}});
    };

    return {
      goDetail
    }
  }
  ,
  props:{
    recommend:{
      type:Array,
      default()
      {
        return [];
      }
    }
  }
}
</script>

<style scoped lang="scss">

.showbook{
  border: 1px solid rgba(136,136,136,.5) ;
  box-shadow: 2px 2px 11px #888888;
  margin:10px 10px 5px;
  height: 110px;
  box-sizing: content-box;

    .book {

      flex-direction: column;
      height: 100%;
      width: 25%;
      float: left;
      font-size: 13px;
      img {
        width: 100%;
        height: 80%;
      }
      .title {
        line-height: 16px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }

    }






}


</style>