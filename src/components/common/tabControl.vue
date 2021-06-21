<template>
  <div class="tabcontrol" >
    <div v-for="(option,index) in options " class="option"
         @click="tap(index)"
         :key="option"
         :class="{'active':index==store.state.curtab}"><span>{{option}}</span></div>
  </div>
</template>

<script>

  import {ref,onMounted} from 'vue';
  import {useStore} from 'vuex'
export default {


  props :{
    options:{
      type: Array,
      default:()=>[]
    }
  },
  setup()
  {
    let store=useStore();
    //点击选项卡切换事件

    let tap=(index)=>{
      store.commit('changecurtab',index);
    }
    return {
      tap,store
    }
  }

}
</script>

<style scoped lang="scss">

  .tabcontrol {
    background: #FFFFFF;
    border: 1px solid rgba(136,136,136,.5) ;
    box-shadow: 2px 2px 11px #888888;
    line-height: 40px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    z-index: 2;
    .option {
      text-align: center;
      flex: 1;
    }
    span {
      padding: 3px;

    }
    .active span{
      border-bottom: 3px var(--color-tint) solid;
      color: var(--color-tint);

    }

  }
</style>