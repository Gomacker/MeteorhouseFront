<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import axios from "axios";
import moment from 'moment';
import {getUnitPicUrl, unit_data} from "@/components/party_manager";
import UnitPic from "@/components/party/components/UnitPic.vue";
import UnitWikiCardBody from "@/components/party/components/UnitWikiCardBody.vue";
import EventCard from "@/components/event/EventCard.vue";
import {show_awakened} from "@/components/party/components/settings";
import {ElMessage} from "element-plus";
import {is_login} from "@/components/user";


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
const on_reload = ref(false)

function reload_data() {
  axios.post(
      '/api/reload_data/'
  ).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: '重载数据完毕，请刷新页面',
          duration: 0
        })
      }
  ).catch(() => {
    ElMessage.error('重载数据失败')
  })
}
// let count = 3
// let times = null
// const unit_index = ref(1)
// onMounted(() => {
//   times = setInterval(() => {
//     count--; //递减
//     console.log(count)
//     if (count <= 0) {
//       // <=0 变成获取按钮
//       console.log(unit_data.value[unit_index.value].name[0])
//       unit_index.value++
//       count = 3
//     }
//   }, 1000); //1000毫秒后执行
// })
//
// onUnmounted(() => {
//
//   clearInterval(times);
// })
const test_uid = ref(1)
</script>

<script>
</script>

<template>
  <el-button @click="get_calendar">get日历</el-button>
  <el-button type="danger" v-if="is_login" :disabled="on_reload" @click="reload_data">reload data</el-button>
  <div v-if="is_login" style="display: flex; flex-direction: column; justify-content: center; text-align: center;">
    <p style="color: orangered; font-weight: bold; font-size: 16px;"># 千里眼(事件表)数据制作中！ #</p>
    <p># 编队计算模块会在能力数据解析完毕后放出 #</p>
    <p># 茶盘气正在适配数据格式 #</p>
    <p># 一图预览页正在前后端相互搬东西（旧版暂时预览用: 域名:端口/api/summary_table/一图流ID/，比如:<a href="/api/summary_table/default/" target="_blank">/api/summary_table/default/</a>） #</p>
    <p># 一图流编辑器（先用表内的new来编辑，新建更名@我） #</p>
    <p># 关于里的相关站有其他的可以说一下（话说NGA的域名之后会主要留哪个） #</p>
    <p># 8说了，写完去给苏打饼干打孔 #</p>
  </div>
  <div v-if="!is_login" style="display: flex; flex-direction: column; justify-content: center; text-align: center;">
    <p style="color: orangered; font-weight: bold; font-size: 24px;"># Meteorhouse Library (Alpha) #</p>
<!--    <p># 茶盘气正在适配数据格式 #</p>-->
    <p style="margin: 16px;">
      <el-button
          size="large"
          style="
            color: white;
            background: linear-gradient(45deg, rgba(255,0,0,0.64), rgba(0,0,255,0.59));
          "
          @click="$router.push('/party_searcher')"
      >
        查盘器
      </el-button>
    </p>
    <div style="width: 80%; align-self: center;">

      <el-alert style="margin: 8px 0;" type="warning" show-icon :closable="false">
        测试中
      </el-alert>
      <el-alert style="margin: 8px 0;" type="info" show-icon :closable="false">
        前端重构中
      </el-alert>
      <el-alert style="margin: 8px 0;" type="warning" show-icon :closable="false">
        匿名上传已禁用
      </el-alert>
    </div>
  </div>
<!--  <div style="position: sticky; top: 0; z-index: 10; background-color: white; box-shadow: 0 0 4px black; padding: 8px 16px; border-radius: 8px;">-->
<!--    <p>Show Awakened <el-switch v-model="show_awakened"/></p>-->
<!--    <p>-->
<!--      Anise ID-->
<!--      <el-input-number-->
<!--          v-model="test_uid"-->
<!--          :min="1"-->
<!--      />-->
<!--    </p>-->
<!--  </div>-->
<!--&lt;!&ndash;  <UnitWikiCardBody v-for="unit in unit_data" :unit="unit"/>&ndash;&gt;-->
<!--  <UnitWikiCardBody style="margin: 16px;" :unit="unit_data[test_uid]"/>-->

  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
    <div style="display: flex; align-items: flex-start; flex-wrap: wrap;">
      <EventCard v-for="cal in cal_data" :event="{
      title: cal.title,
      description: '开始时间：' + moment(new Date(cal['timeStart'])).format('YYYY-MM-DD hh:mm:ss') + '\n结束时间：' + moment(new Date(cal['timeEnd'])).format('YYYY-MM-DD hh:mm:ss'),
      image_url: 'https://wf-calendar.miaowm5.com/banner/ch/' + cal.id + '.' + cal.image,
      background_color: '#ffffff'
    }"/>
    </div>
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