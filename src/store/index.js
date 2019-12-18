import Vue from 'vue'
import Vuex from 'vuex'

//使用Vuex状态管理插件库
Vue.use(Vuex)

//实例化Vuex并暴露
export default new Vuex.Store({
  state: {
    historysearch: [],
  },
  mutations: {
    sethistory(state, payload) {
      if (state.historysearch.length === 0) {
        state.historysearch.push(payload)
      } else {
        let one=state.historysearch.some((item)=>{
            return item===payload
        })
        if(!one){
          state.historysearch.push(payload)
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
