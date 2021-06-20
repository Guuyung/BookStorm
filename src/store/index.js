import { createStore } from 'vuex'

export default createStore({
  state: {
    //当前点击的控制项
    curtab:0
  },
  mutations: {
    changecurtab(state,cur)
    {
      this.state.curtab=cur;
    }
  },
  actions: {
  },
  modules: {
  }
})
