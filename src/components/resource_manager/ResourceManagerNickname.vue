<script setup>
// import {getArmamentPicUrl, armament_data} from '@/components/party_manager'

import UnitPicInfo from "@/components/party/components/UnitPicInfo.vue";
import {unit_data} from "@/components/party_manager";
import {Loading} from "@element-plus/icons-vue";

import {ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const nickname_data = ref({})
const edited = ref(new Set())
const loading = ref(true)

function get_data() {
  loading.value = true
  axios.post(
      '/api/nickname_data/'
  ).then(r => {
    loading.value = false
    nickname_data.value = r.data
    edited.value.clear()
    ElMessage.success('加载成功')
  }).catch(r => {
    loading.value = false
    ElMessage.error('加载失败')
  })
}
get_data()
function save_data() {
  axios.post(
      '/api/update_nickname_data/',
      {edited: Object.fromEntries(Object.entries(nickname_data.value).filter((v, k) => {return edited.value.has((k+1).toString())}))}
  ).then(r => {
    if (r.data['result'] === 'success') {
      edited.value.clear()
      ElMessage.success('保存成功')
    }else {
      ElMessage.error('保存失败')
    }
  }).catch(
      () => {
        ElMessage.error('保存失败(连接失败)')
      }
  )
}
</script>
<template>
  <div style="display: flex; flex-direction: column; height: 100%">
<!--    {{ JSON.stringify(nickname_data, null, 2).replaceAll('\n', '<\p><\/p>').replaceAll(' ', '&nbsp;') }}-->
    <div
        style="
          /*position: sticky;*/
          /*top: 0;*/
          z-index: 20;
          background-color: #fff;
          width: 100%;
          padding: 8px;
          box-shadow: 0 0 4px black;
        "
    >
      <div>
        {{ edited }}
        {{ Object.fromEntries(Object.entries(nickname_data).filter((v, k) => {return edited.has((k+1).toString())})) }}
      </div>
      <el-button type="primary" plain @click="get_data()" :disabled="loading">
        <el-icon v-if="loading" class="is-loading"><Loading /></el-icon>
        刷新
      </el-button>

      <el-button type="primary" @click="save_data()" :disabled="!edited.size">保存</el-button>
    </div>
    <el-scrollbar
        always
        max-height="100%"
    >
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
                  @input="edited.add(id_);"
              />
              <el-button
                  type="danger"
                  size="small"
                  style="margin: 2px;"
                  @click="nicknames.splice(index, 1);edited.add(id_);"
              >x</el-button>
            </div>
            <div>
              <el-button
                  size="small"
                  type="primary"
                  plain
                  round
                  style="width: 100%; font-weight: bold; font-size: 18px;"
                  @click="nicknames.push('');edited.add(id_);"
              >
                +
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<!--<script>-->


<!--export default {-->
<!--  name: "ResourceManagerArmament",-->
<!--  data() {-->
<!--    return {-->
<!--      nickname_data: nickname_data-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style scoped>

</style>
