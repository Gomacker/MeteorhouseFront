<script setup>
import {ref} from "vue";
import axios from "axios";
import moment from 'moment';


const page_name = ref('pray for you')
const cal_data = ref([])
// page_name.value = 'a'
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
    // cal_data = response.data
    // page_name = cal_data
  })
  // }).catch(function (error) {
  //   page_name = error
  // });
  // console.log(res)
  // return res.data
  // return cal_data
}
</script>

<script>
</script>

<template>
  <el-button @click="get_calendar">get</el-button>
  <h1>I'm {{ page_name }}</h1>
<!--  {{ cal_data }}-->
  <div style="color: red">
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
  </div>
  okay
</template>

<style scoped>

</style>