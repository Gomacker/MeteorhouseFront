<script setup>
import {getArmamentPicUrl, armament_data} from '@/components/party_manager'

</script>
<template>
  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
<!--    <el-row v-for="unit in unit_data" style="border: red solid 1px; width: 360px;">-->
    <el-card v-for="armament in armament_data" style="border: red solid 1px; margin: 6px; width: 360px;">
        <img :src="getArmamentPicUrl(armament)" style="width: 82px; height: 82px;" loading="lazy" alt=""/>
        {{ armament }}
    </el-card>
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>
export default {
  name: "ResourceManagerArmament",
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
