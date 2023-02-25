import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store";

//导入 nprogress
import NProgress from "nprogress"
//导入 nprogress样式
import 'nprogress/nprogress.css'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home'),
        children: [
            {path: '/', name: '平台首页', component: () => import('../views/UserMain')},
            {path: 'Traceability', name: '平台溯源', component: () => import('../views/Traceability')},
            {path: 'Settlement', name: '企业入驻', component: () => import('../views/Settlement')},
            {path: 'AboutUs', name: '关于我们', component: () => import('../views/AboutUs')},
            {path: 'EnterpriseLogin', name: '企业登录', component: () => import('../views/EnterpriseLogin')},
            {path: 'AdminLogin', name: "平台管理", component: () => import('../views/AdminLogin')}
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: '404',
        component: () => import('../pages/404'),
    },
    {
        path: '/AdminLogin',
        name: "平台管理",
        component: () => import('../views/AdminLogin')
    },
]


//创建一个路由对象
const router = createRouter({
    mode: 'history',
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// 提供一个重置路由的方法
export const resetRouter = () => {
    router.matcher = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
}


// 注意：刷新页面会导致页面路由重置
export const setRoutes = () => {
    const storeMenus = localStorage.getItem("menus");
    if (storeMenus) {
        // 获取当前的路由对象名称数组
        const currentRouteNames = router.getRoutes().map(v => v.name)
        if (!currentRouteNames.includes('Manage')) {
            const manageRoute = {
                path: '/',
                name: 'Manage',
                component: () => import('../components/Manage'),
                redirect: "/AdminMain",
                children: [
                    {
                        path: '/Manage',
                        name: '溯源平台',
                        component: () => import('../views/AdminMain'),
                    }
                ]
            }
            const menus = JSON.parse(storeMenus)
            menus.forEach(item => {
                if (item.path) {  // 当且仅当path不为空的时候才去设置路由
                    let itemMenu = {
                        path: item.path.replace("/", ""),
                        name: item.name,
                        component: () => import('../views/' + item.page_path + '.vue')
                    }
                    manageRoute.children.push(itemMenu)
                } else if (item.children.length) {
                    item.children.forEach(item => {
                        if (item.path) {
                            let itemMenu = {
                                path: item.path.replace("/", ""),
                                name: item.name,
                                component: () => import('../views/' + item.page_path + '.vue')
                            }
                            manageRoute.children.push(itemMenu)
                        }
                    })
                }
            })
            // 动态添加到现在的路由对象中去
            router.addRoute(manageRoute)
        }
    }
}
// 重置就再set一次路由
setRoutes()

// 定义路由导航前置路由守卫
router.beforeEach((to, from, next) => {
    NProgress.start();
    localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
    store.commit("setPath")  // 触发store的数据更新

    // 未找到路由的情况
    if (!to.matched.length) {
        const storeMenus = localStorage.getItem("menus")
        if (storeMenus) {
            next("/404")
        } else {
            next("/")
        }
    }
    // 其他的情况都放行
    next()
})

// 定义路由导航后置路由守卫
router.afterEach((to, from) => {
    NProgress.done();
})

export default router
