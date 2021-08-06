<template>
  test
  {{cc}}
  <button @click="f">+1</button>
</template>

<script>
import {computed, ref, watchEffect} from "vue";

export default {
  emits: ['update:temp'],
  props:
      {
        temp: {
          default: ''
        }
      },

  setup() {
    let c=1;
    let cc=computed(()=> {
     return c
    });
    return {
      cc,
      f()
      {
        cc.value++;
        console.log(cc.value)
      }

    }
  },
  methods: {
    change(e) {
      this.$emit('update:temp', e.target.value)
    }
  }
}
</script>

<style scoped lang="scss">

</style>