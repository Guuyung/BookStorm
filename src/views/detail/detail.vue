<template>
    <div>
        detail
      {{$route.query.id}}
    </div>
</template>

<script>
  import {useRoute} from 'vue-router';
  import {ref} from 'vue'
    export default {
        setup()
        {
          let id=ref(0);
          const route=useRoute();
          // id.value=route.query.id;

          return {
            id
          }
        }
    }
</script>

<style scoped>

</style>