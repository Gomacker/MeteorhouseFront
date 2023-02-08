<script setup>
import {getUnitPicUrl, unit_data} from '@/components/party_manager'
import {UserFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

</script>
<template>
  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
    <div class="big-button" style="background-color: #238123;" @click="$router.push('/resource_manager/unit')">
      <div style="color: white; font-size: 28px; font-weight: bold;">
        <el-icon><UserFilled /></el-icon>
        Unit
      </div>
      <div style="font-size: 14px; color: lightgrey;">
        已加载 {{ Object.keys(unit_data).length }} 个角色
      </div>
    </div>
    <div class="big-button" style="background-color: #1e209a;" @click="$router.push('/resource_manager/armament')">
      <div style="color: white; font-size: 28px; font-weight: bold;">
        <el-icon><UserFilled /></el-icon>
        Armament
      </div>
      <div style="font-size: 14px; color: lightgrey;">
        已加载 0 个武器
      </div>
    </div>
    <div class="big-button" style="background-color: #25837a;" @click="$router.push('/resource_manager/event')">
      <div style="color: white; font-size: 28px; font-weight: bold;">
        <el-icon><UserFilled /></el-icon>
        Event
      </div>
      <div style="font-size: 14px; color: lightgrey;">
        已加载 0 个事件
      </div>
    </div>
    <div class="big-button" style="background-color: #b46326;" @click="$router.push('/resource_manager/nickname')">
      <div style="color: white; font-size: 28px; font-weight: bold;">
        <el-icon><UserFilled /></el-icon>
        Nickname
      </div>
      <div style="font-size: 14px; color: lightgrey;">
        已加载 0 个昵称
      </div>
    </div>
    <div class="big-button" style="background-color: #808080;" @click="ElMessage.error('未完成')">
      <div style="color: white; font-size: 28px; font-weight: bold;">
        <el-icon><UserFilled /></el-icon>
        Query Map
      </div>
      <div style="font-size: 14px; color: lightgrey;">
        已加载 0 个查询词条
      </div>
    </div>
    <div class="big-button" style="background-color: #808080;" @click="ElMessage.error('未完成')">
      <div style="color: white; font-size: 28px; font-weight: bold;">
        <el-icon><UserFilled /></el-icon>
        Party
      </div>
      <div style="font-size: 14px; color: lightgrey;">
        已加载 0 个盘子
      </div>
    </div>
    <div class="big-button" style="background-color: #808080;" @click="ElMessage.error('未完成')">
      <div style="color: white; font-size: 28px; font-weight: bold;">
        <el-icon><UserFilled /></el-icon>
        Bot Message
      </div>
      <div style="font-size: 14px; color: lightgrey;">
        已加载 0 个Bot消息模版
      </div>
    </div>
    <div class="big-button" style="background-color: #808080;" @click="ElMessage.error('未完成')">
      <div style="color: white; font-size: 28px; font-weight: bold;">
        <el-icon><UserFilled /></el-icon>
        Account
      </div>
      <div style="font-size: 14px; color: lightgrey;">
        已加载 0 个账号绑定
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResourceManager",
  data() {
    return {}
  }
}
</script>

<style scoped>
.big-button {
  width: 240px;
  height: 120px;
  border-radius: 16px;
  padding: 16px;
  transition: box-shadow 0.4s linear;
  cursor: pointer;
  margin: 8px;
  user-select: none;
}
.big-button:hover {
  box-shadow: var(--el-box-shadow);
}
</style>
