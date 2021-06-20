<template>

    <div class="showbook">
      <div class="book" v-for="item in recommend.slice(0,4)" key="item.id">
        <a href="" @click.prevent="goDetail(item.id)">
          <img :src="item.cover_url" >
          <div class="title">{{item.title}}</div>
        </a>
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
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  border: 1px solid rgba(136,136,136,.5) ;
  box-shadow: 2px 2px 11px #888888;
  margin:10px 10px 0px;
  height: 110px;
  display: flex;
}
  .book {
    flex: 1;
    font-size: 10px;
    text-align: center;
    img {
      height: 72%;
    }
  }

</style>