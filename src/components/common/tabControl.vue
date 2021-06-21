<template>
  <div class="tabcontrol"  :class="{'isfix' : isFixed}"  :style="{top:toplength+'px'}">
    <div v-for="(option,index) in options " class="option"
         @click="tap(index)"
         :key="option"
         :class="{active:index==curactive}"><span>{{option}}</span></div>
  </div>
</template>

<script>
  import BScroll from "@better-scroll/core";
  import {ref,onMounted} from 'vue';
  import {useStore} from 'vuex'
export default {


  props :{
    toplength:{
      type: Number,
      default:0
    },
    options:{
      type: Array,
      default:()=>[]
    }
  },
  setup(props,{emit})
  {
    let store=useStore();
    let curactive=ref(0);

    //点击选项卡切换事件
    let tap=(index)=>{
      curactive.value=index;
      store.commit('changecurtab',index);
      // console.log(store.state.curtab)
    }

    let isFixed=ref(false);



    onMounted(()=>{

      let ele=document.querySelector('.tabcontrol');
      let position=ele.getBoundingClientRect().top;
      const handleScroll=()=>{

          let scrolltop=window.pageYOffset;
        if(scrolltop>position-props.toplength)
        {

          isFixed.value=true;
        }else
          isFixed.value=false;
      }

      window.addEventListener('scroll',handleScroll)
    })


    return {
      ref,curactive,tap,isFixed
    }
  }

}
</script>

<style scoped lang="scss">
  .isfix {
    margin-top: 0;
    width: calc(100vw - 20px);
    position: fixed;
  }
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