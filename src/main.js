import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import './assets/main.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import {unit_data, armament_data} from "@/components/party_manager";
import {table_data, table_change, type_change} from "@/components/summary_table_editor";

const Calculator = () => import("@/components/Calculator.vue")
// import Calculator from "@/components/Calculator.vue";
const MainPage = () => import("@/components/MainPage.vue")
// import MainPage from "@/components/MainPage.vue";
const SummaryTable = () => import("@/components/SummaryTable.vue")
const SummaryTableList = () => import("@/components/SummaryTableList.vue")
const SummaryTableEditor = () => import("@/components/SummaryTableEditor.vue")
const FutureVision = () => import("@/components/FutureVision.vue")
const About = () => import("@/components/About.vue")
const Login = () => import("@/components/Login.vue")
const ResourceManager = () => import("@/components/ResourceManager.vue")
import {createRouter, createWebHistory} from "vue-router";
// import VueRouter from "vue-router";

const routes = [
    {path: '/', component: MainPage},
    {path: '/future_vision', component: FutureVision},
    {path: '/calculator', component: Calculator},
    {path: '/summary_table/:st_id', component: SummaryTable},
    {path: '/summary_table_list', component: SummaryTableList},
    {path: '/summary_table_editor', component: SummaryTableEditor},
    {path: '/about', component: About},
    {path: '/login', component: Login},
    {path: '/resource_manager', component: ResourceManager},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
Array.prototype.insert = function(index, value){
    this.splice(index,0, value);
}
Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    let i = 0, n = 0;
    for(; i<this.length; i++)
    {
        if(this[i]!==this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
}
const app = createApp(App)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.mount('#app')
