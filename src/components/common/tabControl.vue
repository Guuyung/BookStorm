<template>
  <div class="tabcontrol"  :class="{'isfix' : isFixed}"  :style="{top:top+'px'}">
    <div v-for="(option,index) in options " class="option"
         @click="tap(index)"
         :key="option"
         :class="{active:index==curactive}"><span>{{option}}</span></div>
  </div>
</template>

<script>
  import {ref,onMounted} from 'vue';
export default {


  props :{
    top:{
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
    let curactive=ref(0);

    let tap=(index)=>{
      curactive.value=index;
      emit('tabclick',index);
    }

    let isFixed=ref(false);



    onMounted(()=>{
      let position=document.querySelector('.tabcontrol').getBoundingClientRect().top;
      const handleScroll=()=>{

          let scrolltop=window.pageYOffset;

        console.log("position      "+position)
        console.log("scrolltop     "+scrolltop)
        if(scrolltop>position-props.top)
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
    //left: 20px;
    //right: 20px;
    width: calc(100vw - 20px);
    position: fixed;
  }
  .tabcontrol {

    background: #FFFFFF;

    border: 1px solid rgba(136,136,136,.5) ;
    box-shadow: 2px 2px 11px #888888;

    line-height: 40px;
    margin: 10px 10px 10px;
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