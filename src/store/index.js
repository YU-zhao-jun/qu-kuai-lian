import { createStore } from 'vuex'
import router, {resetRouter} from "@/router";

export default createStore({
  state: {
    currentPathName: ''
  },
  getters: {

  },
  mutations: {
    setPath (state) {
      state.currentPathName = localStorage.getItem("currentPathName")
    },
    logout() {
      // 清空缓存
      localStorage.removeItem("User")
      localStorage.removeItem("menus")
      router.push("/")
      // 重置路由
      resetRouter()
    }
  },
  actions: {
  },
  modules: {
  }
})
