<script setup>
// import {getArmamentPicUrl, armament_data} from '@/components/party_manager'

import UnitPicInfo from "@/components/party/components/UnitPicInfo.vue";
import {unit_data} from "@/components/party_manager";
</script>
<template>
  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
<!--    {{ JSON.stringify(nickname_data, null, 2).replaceAll('\n', '<\p><\/p>').replaceAll(' ', '&nbsp;') }}-->
    <div
        style="
          position: sticky;
          top: 0;
          z-index: 20;
          background-color: #fff;
          width: 100%;
          padding: 8px;
          box-shadow: 0 0 4px black;
        "
    >
      <el-button type="primary">保存</el-button>
    </div>
    <div
        style="
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: center;
          padding: 8px;
        "
    >
      <div
          v-for="(nicknames, id_) in nickname_data"
          style="
            background-color: pink;
            box-shadow: 0 0 8px pink;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 4px;
            padding: 8px;
            border-radius: 8px;
          "
      >
        <UnitPicInfo :unit_data="unit_data[id_]"/>
        <div style="padding: 4px; width: 160px; display: flex; flex-direction: column;">
<!--          {{nicknames.length - 1}}-->
          <div
              v-for="index in Object.keys(nicknames)"
              style="margin: 2px; display: flex; align-items: center;"
          >
            <el-input
                v-model="nicknames[index]"
            />
            <el-button
                type="danger"
                size="small"
                style="margin: 2px;"
                @click="nicknames.splice(index, 1)"
            >x</el-button>
          </div>
          <div>
            <el-button
                size="small"
                type="primary"
                plain
                round
                style="width: 100%; font-weight: bold; font-size: 18px;"
                @click="nicknames.push('')"
            >
              +
            </el-button>
          </div>
        </div>
      </div>
    </div>
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
