import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import './assets/main.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const Calculator = () => import("@/components/Calculator.vue")
// import Calculator from "@/components/Calculator.vue";
const MainPage = () => import("@/components/MainPage.vue")
// import MainPage from "@/components/MainPage.vue";
const SummaryTableList = () => import("@/components/SummaryTableList.vue")
const SummaryTableEditor = () => import("@/components/SummaryTableEditor.vue")
const FutureVision = () => import("@/components/FutureVision.vue")
const About = () => import("@/components/About.vue")
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
// import VueRouter from "vue-router";

const routes = [
    {path: '/', component: MainPage},
    {path: '/future_vision', component: FutureVision},
    {path: '/calculator', component: Calculator},
    {path: '/summary_table_list', component: SummaryTableList},
    {path: '/summary_table_editor', component: SummaryTableEditor},
    {path: '/about', component: About},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


const app = createApp(App)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.mount('#app')
