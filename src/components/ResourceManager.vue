<script setup>
import {getUnitPicUrl, unit_data} from '@/components/party_manager'

</script>
<template>
  <el-row>
    <el-col>
    </el-col>
  </el-row>
  <div style="display: flex; flex-direction: column;">
    <el-row v-for="unit in unit_data" style="border: red solid 1px;">
      <el-col style="width: 82px;">
        <img :src="getUnitPicUrl(unit)" style="width: 82px;" loading="lazy" alt=""/>
        {{ unit }}
      </el-col>
    </el-row>
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

</style>
