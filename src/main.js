import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'

import './assets/main.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {createRouter, createWebHistory} from "vue-router";
import AppPure from "@/AppPure.vue";
import AppCard from "@/AppCard.vue";
const UnitWikiCard = () => import("@/components/party/UnitWikiCard.vue")

const Calculator = () => import("@/components/Calculator.vue")
// import Calculator from "@/components/Calculator.vue";
const MainPage = () => import("@/components/MainPage.vue")
// import MainPage from "@/components/MainPage.vue";
const PartySearcher = () => import("@/components/PartySearcher.vue")
const PartySearcherPure = () => import("@/components/PartySearcherPure.vue")
const SummaryTablePage = () => import("@/components/SummaryTablePage.vue")
const SummaryTableList = () => import("@/components/SummaryTableList.vue")
const SummaryTableEditor = () => import("@/components/SummaryTableEditor.vue")
const FutureVision = () => import("@/components/FutureVision.vue")
const About = () => import("@/components/About.vue")
const Login = () => import("@/components/Login.vue")
const ResourceManager = () => import("@/components/ResourceManager.vue")
const ResourceManagerUnit = () => import("@/components/resource_manager/ResourceManagerUnit.vue")
const ResourceManagerArmament = () => import("@/components/resource_manager/ResourceManagerArmament.vue")
const ResourceManagerEvent = () => import("@/components/resource_manager/ResourceManagerEvent.vue")
const ResourceManagerNickname = () => import("@/components/resource_manager/ResourceManagerNickname.vue")
const TestPlace = () => import("@/components/TestPlace.vue")
const ObjFilter = () => import("@/components/ObjFilter.vue")
const PlayerInfo = () => import("@/components/PlayerInfo.vue")
// import VueRouter from "vue-router";

const routes = [
    {path: '/', component: MainPage},
    {path: '/future_vision', component: FutureVision},
    {path: '/calculator', component: Calculator},
    {path: '/party_searcher', component: PartySearcher},
    // {path: '/party_searcher_pure', component: PartySearcherPure},
    {path: '/summary_table/:st_id', component: SummaryTablePage},
    {path: '/summary_table_list', component: SummaryTableList},
    {path: '/summary_table_editor', component: SummaryTableEditor},
    {path: '/about', component: About},
    {path: '/login', component: Login},
    {path: '/resource_manager', component: ResourceManager},
    {path: '/resource_manager/unit', component: ResourceManagerUnit},
    {path: '/resource_manager/armament', component: ResourceManagerArmament},
    {path: '/resource_manager/event', component: ResourceManagerEvent},
    {path: '/resource_manager/nickname', component: ResourceManagerNickname},
    {path: '/test_place', component: TestPlace},
    // {path: '/test_place_pure', component: TestPlace},
]
const routes_pure = [
    {path: '/pure/party_searcher', component: PartySearcherPure},
    {path: '/pure/test_place', component: TestPlace},
    {path: '/pure/filter', component: ObjFilter},
    // {path: '/test_place', component: TestPlace},
]
const routes_card = [
    {path: '/card/unit', component: UnitWikiCard},
    {path: '/card/player', component: PlayerInfo},
    {path: '/card/summary_table/:st_id', component: SummaryTablePage},
    {path: '/card/party_searcher', component: PartySearcherPure},
    // {path: '/test_place', component: TestPlace},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes.concat(routes_pure).concat(routes_card)
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

console.log('this')
const search = {}

if (location.search) {
    location.search.split('?')[1].split('&').forEach(item => {
        const key = item.split('=')[0]
        search[key] = decodeURIComponent(item.split('=')[1])
    })
}
console.log(location)
console.log(routes_pure.map((v, i) => v.path))
const pure_paths = routes_pure.map((v, i) => v.path)
const card_paths = routes_card.map((v, i) => v.path)
if (pure_paths.includes(location.pathname) || pure_paths.includes(location.pathname.substring(0, location.pathname.length - 1))) {
    const app = createApp(AppPure)
    app.use(router)
    app.use(ElementPlus, {locale: zhCn})
    app.mount('#app')
} else if (
    card_paths.includes(location.pathname) ||
    card_paths.includes(location.pathname.substring(0, location.pathname.length - 1)) ||
    location.pathname.includes('/card/summary_table/')
) {
    const app = createApp(AppCard)
    app.use(router)
    app.use(ElementPlus, {locale: zhCn})
    app.mount('#app')
} else {
    const app = createApp(App)
    app.use(router)
    app.use(ElementPlus, {locale: zhCn})
    app.mount('#app')
}
