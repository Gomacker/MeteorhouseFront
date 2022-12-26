<script setup>
import HelloWorld from './components/HelloWorld.vue'
import {Expand, Calendar, Menu, Search, Management, InfoFilled} from "@element-plus/icons-vue";


</script>
<script>
export default {
  data() {
    return {
      sidebar_hidden: false
    }
  }
}
</script>
<template>
  <div style="width: 100%; height: 100%">
<!--    <button @click="count++">Count is: {{ count }}</button>-->
    <el-container style="height: 100%">
      <el-header style="background: linear-gradient(to right, #fa8afa, yellow); display: flex; z-index: 10;">
        <el-page-header title=" " :icon="Expand" @back="sidebar_hidden = !sidebar_hidden">
          <template #content>
<!--            <div @click="this.$router.push('/')">Meteorhouse Library</div>-->
            <router-link style="color: black" to="/">Meteorhouse Library (Alpha)</router-link>
          </template>
        </el-page-header>
<!--        <el-button style="position: absolute; right: 16px"-->
<!--                   @click="sidebar_hidden = !sidebar_hidden">-->
<!--          sidebar_hidden: {{ sidebar_hidden }}-->
<!--        </el-button>-->
      </el-header>
      <el-container>
        <el-aside class="sidebar" v-bind:class="{hidden: sidebar_hidden}" width="200px">
          <el-scrollbar
              style="height: 100%"
              view-style="height: 100%; display: flex; flex-direction: column;"
          >
<!--            <div>-->
<!--              <h1>aa</h1>-->
<!--              <span style="font-size: 64px;">qsqa</span>-->
<!--            </div>-->
            <el-menu default-active="1">
              <el-menu-item index="menu-main-page" @click="this.$router.push('/')">
                主页
              </el-menu-item>
              <el-menu-item index="menu-future-vision" @click="this.$router.push('/future_vision')">
                <el-icon><Calendar /></el-icon>
                千里眼
              </el-menu-item>
              <el-menu-item index="menu-calculator" @click="this.$router.push('/calculator')">
                <el-icon><Menu /></el-icon>
                Calculator(Alpha)
              </el-menu-item>
              <el-menu-item disabled="disabled" index="menu-party-searcher">
                <el-icon><Search /></el-icon>
                查盘器
              </el-menu-item>
              <el-menu-item index="menu-summary-table" @click="this.$router.push('/summary_table_list')">
                <el-icon><Management /></el-icon>
                一图流
              </el-menu-item>
              <el-menu-item index="menu-summary-editor" @click="this.$router.push('/summary_table_editor')">
                <el-icon><Management /></el-icon>
                一图流编辑器(Alpha)
              </el-menu-item>
              <el-menu-item index="about" @click="this.$router.push('/about')">
                <el-icon><InfoFilled /></el-icon>
                关于
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-scrollbar style="position: absolute; width: 100%;" view-style="width: 100%; height: 100%;">
          <el-main :style="{'margin-left': (sidebar_hidden ? 0 : 200 + 'px')}" style="transition: margin-left 0.4s ease;">

<!--          <el-scrollbar>-->
            <router-view></router-view>
<!--          </el-scrollbar>-->
          </el-main>
        </el-scrollbar>
      </el-container>
      <el-footer
        height="24px"
        style="
          background: darkgray;
          text-align: center;
          position: relative;
          /*position: fixed;*/
          bottom: 0;
          width: 100%;
          z-index: 10;
        "
      >
        Author: @Kranca / Gomacker
        <a href="https://space.bilibili.com/11466987" target="_blank">
          <img style="width: 16px; vertical-align: middle;" src="https://www.bilibili.com/favicon.ico" alt="">
        </a>
      </el-footer>
    </el-container>
  </div>
</template>

<style>
/*@media (hover: hover) {*/
/*  .a:hover {*/
/*    background: none;*/
/*  }*/
/*}*/
.el-menu-item.is-active {
  background: var(--el-menu-hover-bg-color);
}
</style>

<style scoped>

main {
  height: 100%;
  background: #f8f8f8;
}

.sidebar {
  top: 0;
  left: 0;
  background: white;
  /*position: fixed;*/
  position: absolute;
  /*position: relative;*/
  z-index: 9;
  height: 100%;
  /*background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), #1f1e33);*/
  box-shadow: black 0 0 8px;
  transition: left 0.4s ease, opacity 0.4s ease;
  /*transition: margin-left 0.4s ease, opacity 0.4s ease;*/
}
.hidden {
  left: -200px;
  /*margin-left: -200px;*/
  opacity: 0;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
}
@media (min-width: 1024px) {
  /*header {*/
  /*  display: flex;*/
  /*  place-items: center;*/
  /*  padding-right: calc(var(--section-gap) / 2);*/
  /*}*/

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
