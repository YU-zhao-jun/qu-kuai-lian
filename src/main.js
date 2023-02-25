import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import axios, {Axios} from 'axios'
import request from "@/utils/request";


import Web3 from 'web3'


import './assets/css/Margins.css'
import './assets/css/All.css'
import './assets/css/fonts.css'

//接口跨域
const cors = require("cors")

// 设置 web3 的 provider
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const app = createApp(App)

axios.defaults.withCredentials = true
app.config.productionTip = false
app.config.globalProperties.$routerG = router
app.config.globalProperties.$http = axios
app.config.globalProperties.$http = Axios
app.config.globalProperties.request = request
app.config.globalProperties.$Web3 = web3


app.use(ElementPlus, {locale: zhCn, size: "mini",})
    .use(store)
    .use(router)
    .use(cors)
    .mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

