<script setup>
import {ref} from "vue";
import axios from "axios";
import moment from 'moment';


const cal_data = ref([])
const get_calendar = function () {
  axios.get(
      'https://wf-calendar.miaowm5.com/data/info.json'
  )
  .then(function (response) {
    console.log(response.data)
    // console.log(JSON.stringify(response.data))
    cal_data.value = response.data.list[1].list
    cal_data.value.sort((a, b) => {
      return a['timeEnd'] < b['timeEnd'] ? -1 : a['timeEnd'] > b['timeEnd'] ? 1 : 0
    })
  })
}
</script>

<script>
</script>

<template>
  <el-button @click="get_calendar">get日历</el-button>
  <div>
    <p># 千里眼(事件表)会往后放一放（前端与数据困难） #</p>
    <p># 编队计算模块会在能力数据解析完毕后放出 #</p>
    <p># 茶盘气数据格式接近完善，但仍需优化搜索和api整理 #</p>
    <p># 一图预览页正在前后端相互搬东西 #</p>
    <p style="color: green;"># TODO 正在优先完善一图流编辑器（先用表内的new来编辑，不新建） #</p>
    <p># 素材包能放嘛（指接近到干炸里脊的程度（ #</p>
    <p># 账号还没开始写😫 #</p>
    <p># 资源管理先不开，怕这个ip泄露出去被乱改寄了 #</p>
    <p># 关于里的相关站有其他的可以说一下（话说NGA的域名之后会主要留哪个） #</p>
    <p># 8说了，写完去给苏打饼干打孔 #</p>
  </div>
  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
    <el-card v-for="cal in cal_data" body-style="padding: 0" style="width: 200px; margin: 8px;">
      <el-image :src="'https://wf-calendar.miaowm5.com/banner/ch/' + cal.id + '.' + cal.image"
                style="width: 200px; height: 105px; /* box-shadow: var(--el-box-shadow); */" fit="cover"
                loading="lazy"
      >
      </el-image>
      <div style="padding: 8px; font-size: 8px;">
        <p>{{ cal["title"] }}</p>
        <p>结束时间: {{ moment(new Date(cal['timeEnd'])).format('YYYY-MM-DD hh:mm:ss') }}</p>
      </div>
    </el-card>
<!--      {{ cal }}-->
<!--      <img src="https://wf-calendar.miaowm5.com/banner/ch/{{ cal.id }}.{{ cal.image }}">-->
  </div>
</template>

<style scoped>

</style>