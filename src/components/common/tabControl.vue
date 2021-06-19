<template>
  <div class="tabcontrol"  :class="{'isfix' : isFixed}"  :style="{top:toplength+'px'}">
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
    let curactive=ref(0);

    let tap=(index)=>{
      curactive.value=index;
      emit('tabclick',index);
    }

    let isFixed=ref(false);



    onMounted(()=>{

      let ele=document.querySelector('.tabcontrol');
      let position=ele.getBoundingClientRect().top;
      console.log(props.toplength)
      console.log(document.body.scrollTop)
      const handleScroll=()=>{

          let scrolltop=window.pageYOffset;

        console.log("position      "+position)
        console.log("scrolltop     "+scrolltop)
        if(scrolltop>position-props.toplength)
        {

          isFixed.value=true;
          console.log(ele.getBoundingClientRect().top)
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