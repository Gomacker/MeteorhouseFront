<script setup>
// import {getArmamentPicUrl, armament_data} from '@/components/party_manager'

</script>
<template>
  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
<!--    {{ JSON.stringify(nickname_data, null, 2).replaceAll('\n', '<\p><\/p>').replaceAll(' ', '&nbsp;') }}-->
    <div style="display: flex; flex-direction: column;">
      <div v-for="(u, id_) in nickname_data">
        {{ id_ }}: {{ u }}
      </div>
    </div>
<!--    <el-row v-for="unit in unit_data" style="border: red solid 1px; width: 360px;">-->
<!--    <el-card v-for="armament in armament_data" style="border: red solid 1px; margin: 6px; width: 360px;">-->
<!--        <img :src="getArmamentPicUrl(armament)" style="width: 82px; height: 82px;" loading="lazy" alt=""/>-->
<!--        {{ armament }}-->
<!--    </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>

import {ref} from "vue";
import axios from "axios";

const nickname_data = ref({})

axios.post(
    '/api/nickname_data/'
).then(r => {
  nickname_data.value = r.data
})

export default {
  name: "ResourceManagerArmament",
  data() {
    return {
      nickname_data: nickname_data
    }
  }
}
</script>

<style scoped>

</style>
