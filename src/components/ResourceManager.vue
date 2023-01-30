<script setup>
import {getUnitPicUrl, unit_data} from '@/components/party_manager'
import {UserFilled} from "@element-plus/icons-vue";

</script>
<template>
  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
    <div class="big-button" style="background-color: #3cb43c;" @click="$router.push('/resource_manager/unit')">
      <div style="color: white; font-size: 28px; font-weight: bold;">
        <el-icon><UserFilled /></el-icon>
        Unit
      </div>
      <div style="font-size: 14px; color: lightgrey;">
        已加载 {{ Object.keys(unit_data).length }} 个角色
      </div>
    </div>
    <div class="big-button" style="background-color: #32a99f;" @click="$router.push('/resource_manager/event')">
      <div style="color: white; font-size: 28px; font-weight: bold;">
        <el-icon><UserFilled /></el-icon>
        Event
      </div>
      <div style="font-size: 14px; color: lightgrey;">
<!--        已加载 {{ Object.keys(unit_data).length }} 个角色-->
        已加载 0 个事件
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
}
.big-button:hover {
  box-shadow: var(--el-box-shadow);
}
</style>
