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
<!--  <div style="width: 100%; height: 100%">-->
  <div>
<!--    <button @click="count++">Count is: {{ count }}</button>-->
<!--    <el-container style="height: 100%">-->
<!--      <el-container>-->
<!--  <el-main :style="{'margin-left': 0}" style="transition: margin-left 0.4s ease;">-->
<!--  <img class="bg-magic-circle" src="@/assets/bg_magic_circle.png" alt="" @dragstart.prevent/>-->
  <router-view style="padding: 16px; width: fit-content"></router-view>
<!--  </el-main>-->
<!--      </el-container>-->
<!--    </el-container>-->
  </div>
</template>

<style>
body {
  /*background-color: crimson;*/
  background-color: transparent;
}
.el-menu-item.is-active {
  background: var(--el-menu-hover-bg-color);
}
</style>
<style scoped>

.bg-magic-circle {
  /*position: absolute;*/
  position: fixed;
  /*display: flex;*/
  /*bottom: -35%;*/
  /*justify-content: center;*/
  z-index: 0;
  animation: rotation 16s linear infinite;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 6%));
  /*width: 100%;*/
  /*height: 100%;*/
  user-select: none;
  left: -375px;
  /*left: -200px;*/
  /*right: 30vw;*/
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
