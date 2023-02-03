<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import axios from "axios";
import moment from 'moment';
import {getUnitPicUrl, unit_data} from "@/components/party_manager";


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
let count = 3
let times = null
const unit_id = ref(1)
onMounted(() => {
  times = setInterval(() => {
    count--; //递减
    console.log(count)
    if (count <= 0) {
      // <=0 变成获取按钮
      console.log(unit_data.value[unit_id.value].name[0])
      unit_id.value++
      count = 3
    }
  }, 1000); //1000毫秒后执行
})

onUnmounted(() => {

  clearInterval(times);
})
</script>

<script>
</script>

<template>
  <el-button @click="get_calendar">get日历</el-button>
  <div>
    <p style="color: orangered; font-weight: bold; font-size: 16px;"># 千里眼(事件表)数据制作中！ #</p>
    <p># 编队计算模块会在能力数据解析完毕后放出 #</p>
    <p># 茶盘气正在适配数据格式 #</p>
    <p># 一图预览页正在前后端相互搬东西（旧版暂时预览用: 域名:端口/api/summary_table/一图流ID/，比如:<a href="/api/summary_table/default/" target="_blank">/api/summary_table/default/</a>） #</p>
    <p># 一图流编辑器（先用表内的new来编辑，新建更名@我） #</p>
    <p># 关于里的相关站有其他的可以说一下（话说NGA的域名之后会主要留哪个） #</p>
    <p># 8说了，写完去给苏打饼干打孔 #</p>
    <div>
      <img class="test-img" :src="getUnitPicUrl(unit_data[unit_id])" alt=""/>
      {{ getUnitPicUrl(unit_data[unit_id]) }}
    </div>
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
  </div>
</template>

<style scoped>

.test-img {
  animation: alpha 3s linear infinite;
  /*filter: drop-shadow(0 0 8px rgba(0, 0, 0, 6%));*/
  width: 82px;
  height: 82px;
}
@keyframes alpha {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.8;
  }
  32.5% {
    opacity: 1;
  }
  67.5% {
    opacity: 1;
  }
  75% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}
</style>