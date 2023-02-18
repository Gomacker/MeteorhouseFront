<script setup>
import {Expand, Calendar, Menu, Search, Management, InfoFilled, PictureFilled, UserFilled, List} from "@element-plus/icons-vue";

</script>
<script>

import {ref} from "vue";
import axios from "axios";
import {is_login, user_name, user_avatar, permissions} from '@/components/user'

const sidebar_hidden = ref(false)

export default {
  data() {
    return {
      sidebar_hidden: sidebar_hidden,
      is_login: is_login,
      user_name: user_name,
      user_avatar: user_avatar,
      permissions: permissions
    }
  },
  mounted() {
    axios.post(
        '/api/get_user_profile/'
    ).then(r => {
      is_login.value = r.data['is_login']
      if (is_login.value) {
        console.log(r.data)
        user_name.value = r.data['username']
        permissions.value.summary_table_editor = true
        permissions.value.resource_manager = true
      }else {
        console.log('未登录')
        permissions.value.summary_table_editor = false
        permissions.value.resource_manager = false
      }
    }).catch(
        () => {
          console.log('获取已登录用户失败')
        }
    )
  },
  methods: {
    logout() {
      axios.post(
          '/api/logout/'
      ).then(r => {
        console.log('已登出')
        is_login.value = r.data['is_login']
        user_name.value = ''
        user_avatar.value = ''
        this.$router.go(0)
      }).catch(
          () => {
            console.log('连接失败')
          }
      )
    }
  }
}
</script>
<template>
  <div style="width: 100%; height: 100%">
<!--    <button @click="count++">Count is: {{ count }}</button>-->
    <el-container style="height: 100%">
      <el-header style="background: linear-gradient(to right, #fa8afa, yellow); display: flex; z-index: 10;">
<!--        <div style="display: flex; justify-content: space-between;">-->
        <el-page-header title=" " :icon="Expand" @back="sidebar_hidden = !sidebar_hidden">
          <template #content>
            <router-link style="color: black" to="/">Meteorhouse Library (Alpha)</router-link>
          </template>
        </el-page-header>
        <div style="flex: 1;"/>
        <div style="display: flex; align-items: center; user-select: none; cursor:pointer;">

<!--          <el-button v-if="true" text @click="get_user_profile">huoqv</el-button>-->
          <span v-if="is_login">欢迎回来，{{ user_name }}</span>
          <el-button v-if="is_login" text @click="logout">登出</el-button>

<!--          <el-avatar class="avatar" src="" size="default"/>-->
<!--          <span style="margin: 0 8px;">Gomacker</span>-->
        </div>
<!--        </div>-->
      </el-header>
      <el-container>
        <el-aside class="sidebar" v-bind:class="{hidden: sidebar_hidden}" width="200px" style="user-select: none;">
          <el-scrollbar
              style="height: 100%"
              view-style="height: 100%; display: flex; flex-direction: column;"
          >
<!--            <div>-->
<!--              <h1>aa</h1>-->
<!--              <span style="font-size: 64px;">qsqa</span>-->
<!--            </div>-->
            <el-menu default-active="1">
              <el-menu-item index="menu-main-page" @click="$router.push('/')">
                主页
              </el-menu-item>
              <el-menu-item index="menu-future-vision" @click="$router.push('/future_vision')">
                <el-icon><Calendar /></el-icon>
                千里眼
              </el-menu-item>
              <el-menu-item index="menu-calculator" @click="$router.push('/calculator')">
                <el-icon><Menu /></el-icon>
                编队器(Alpha)
              </el-menu-item>
              <el-menu-item index="menu-party-searcher" @click="$router.push('/party_searcher')">
                <el-icon><Search /></el-icon>
                查盘器
              </el-menu-item>
              <el-menu-item disabled index="menu-summary-table" @click="$router.push('/summary_table_list')">
                <el-icon><Management /></el-icon>
                一图流(维护中)
              </el-menu-item>
              <el-menu-item v-if="permissions.summary_table_editor" index="menu-summary-editor" @click="$router.push('/summary_table_editor')">
                <el-icon><Management /></el-icon>
                一图流编辑器(Alpha)
              </el-menu-item>
<!--              <el-menu-item disabled index="">-->
<!--                <el-icon><PictureFilled /></el-icon>-->
<!--                素材包-->
<!--              </el-menu-item>-->
<!--              <el-menu-item disabled index="">-->
<!--                <el-icon><UserFilled /></el-icon>-->
<!--                我的-->
<!--              </el-menu-item>-->
<!--              <el-menu-item disabled index="">-->
<!--                <el-icon><UserFilled /></el-icon>-->
<!--                Bot管理-->
<!--              </el-menu-item>-->
              <el-menu-item v-if="permissions.resource_manager" index="menu-resource-manager" @click="$router.push('/resource_manager')">
                <el-icon><List /></el-icon>
                资源管理
              </el-menu-item>
              <el-menu-item v-if="permissions.resource_manager" index="test-place" @click="$router.push('/test_place')">
                <el-icon><List /></el-icon>
                <span style="color: lightseagreen;">（测试用）</span>
              </el-menu-item>
              <el-menu-item index="about" @click="$router.push('/about')">
                <el-icon><InfoFilled /></el-icon>
                关于
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-scrollbar style="position: absolute; width: 100%;" view-style="width: 100%; height: 100%;">
<!--          <el-main :style="{'margin-left': (sidebar_hidden ? 0 : 200 + 'px')}" style="transition: margin-left 0.4s ease;">-->
          <el-main
              :style="{'margin-left': (sidebar_hidden ? 0 : 200 + 'px')}"
              style="
                /*padding: 0 0 20px 0;*/
                transition: margin-left 0.4s ease;
              "
          >

<!--            <div style="position: fixed; display: flex; bottom: -500px; justify-content: center;">-->
            <img class="bg-magic-circle" src="@/assets/bg_magic_circle.png" alt="" @dragstart.prevent/>
<!--            </div>-->

<!--          <el-scrollbar>-->
            <router-view></router-view>
<!--          </el-scrollbar>-->
          </el-main>
<!--          </el-main>-->
        </el-scrollbar>
      </el-container>
      <el-footer
        height="24px"
        style="
          background: darkgray;
          text-align: center;
          /*position: absolute;*/
          /*position: fixed;*/
          bottom: 0;
          width: 100%;
          z-index: 10;
          /*color: white;*/
          padding: 2px;
        "
      >
        <a style="color:#222" target="_blank" rel="noopener" href="http://beian.miit.gov.cn/">津ICP备2022008496号-1</a>
<!--        Author: @Kranca / Gomacker-->
<!--        <a href="https://space.bilibili.com/11466987" target="_blank">-->
<!--          <img style="display: inline-block; width: 16px; vertical-align: bottom;" src="https://www.bilibili.com/favicon.ico" alt="">-->
<!--        </a>-->
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

.bg-magic-circle {
  position: fixed;
  z-index: 0;
  animation: rotation 16s linear infinite;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 6%));
  user-select: none;
  left: -375px;
  bottom: -375px;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
main {
  height: 100%;
  background: #f8f8f8;
}

.avatar {
  box-sizing: content-box;
  border: 2px white solid;
  transition: 0.2s border ease;
}

.avatar:hover {
  border: 2px #b45af3 solid;
}

.sidebar {
  top: 0;
  left: 0;
  background: white;
  position: absolute;
  z-index: 9;
  height: 100%;
  box-shadow: black 0 0 8px;
  transition: left 0.4s ease, opacity 0.4s ease;
}
.hidden {
  left: -200px;
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
