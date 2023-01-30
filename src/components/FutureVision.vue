<script setup>
import {onMounted, reactive, ref} from "vue";
import EventCard from "@/components/event/EventCard.vue";
import axios from "axios";

const test_data = ref({})
// test_data.value = {
//   '2021/03/31': {
//     node_type: 'primary',
//     node_color: '',
//     content: [
//       {
//         title: '新角色特选扭蛋',
//         description: '索妮雅(沙漠) 蒂妮(沙漠) 哈里达尔\n2021/3/31 ~ 2021/4/9',
//         image_url: 'https://pbs.twimg.com/media/ExxrFtvVgAEy7Tm?format=jpg&name=small',
//         background_color: '#ffd3ff'
//       },
//       {
//         title: '共誓黎明',
//         description: '无限池活动\n2021/3/31 ~ 2021/4/11',
//         image_url: 'https://pbs.twimg.com/media/ExxrSt-VEAEbAFx?format=jpg&name=small',
//         background_color: '#ffcece'
//       }
//     ]
//   },
//   '2021/04/05': {
//     node_type: 'primary',
//     node_color: '',
//     content: [
//       {
//         title: '共誓黎明(后篇)',
//         description: '赠送 索媞艾丝\n2021/3/31 ~ 2021/4/11',
//         image_url: 'https://pbs.twimg.com/media/EyLbBtdVIAQ3evb?format=jpg&name=small',
//         background_color: '#ffcece'
//       }
//     ]
//   },
//   '2021/04/09': {
//     node_type: 'primary',
//     node_color: '',
//     content: [
//       {
//         title: '特选扭蛋',
//         description: '2021/4/9 ~ 2021/4/16',
//         image_url: 'https://pbs.twimg.com/media/Eya3yw7VoAI94fd?format=jpg&name=small',
//         background_color: '#ffd3ff'
//       },
//       {
//         title: '500日纪念关卡',
//         description: '2021/4/9 ~ 2021/4/19',
//         image_url: 'https://pbs.twimg.com/media/EygBmeHUcAAH0S7?format=jpg&name=small',
//         background_color: '#bceabc'
//       },
//       {
//         title: '500日纪念任务',
//         description: '2021/4/9 ~ 2021/4/19',
//         image_url: 'https://pbs.twimg.com/media/Eya4AviU8AAFdrq?format=jpg&name=small',
//         background_color: '#bceabc'
//       }
//     ]
//   }
// }

onMounted(() => {
  axios.post(
      '/api/timeline_data/'
  ).then(
      r => {
        console.log(r.data)
        test_data.value = r.data
      }
  )
})
</script>
<template>
  <el-timeline style="padding: 0">
    <el-timeline-item v-for="(item, time) in test_data"
                      :timestamp="time"
                      placement="top"
                      :type="item.node_type"
                      :color="item.node_color"
                      hollow
    >
      <div style="display: flex; align-items: flex-start; flex-wrap: wrap;">
        <EventCard v-for="event in item.content" :event="event"></EventCard>
<!--        <el-card v-for="tl_card in item.content"-->
<!--                 body-style="padding: 0"-->
<!--                 style="min-width: fit-content; margin: 4px;"-->
<!--                 :style="{'background-color': tl_card.background_color}"-->
<!--        >-->
<!--          <el-image :src="tl_card.image_url"-->
<!--                    style="width: 200px; height: 115px; display: block;" fit="cover"-->
<!--                    loading="lazy"-->
<!--          >-->
<!--          </el-image>-->
<!--          <div style="padding: 4px 8px; font-size: 8px; width: 200px; overflow-x: hidden;">-->
<!--            <div class="tl-card-title">{{ tl_card.title }}</div>-->
<!--            <div class="tl-card-description"><p v-for="r in tl_card.description.split('\n')">{{ r }}</p></div>-->
<!--          </div>-->
<!--        </el-card>-->
      </div>
    </el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  name: "FutureVision",
  // data() {
  //   return {
  //     name: "FutureVision"
  //   }
  // }
}
</script>

<style>
.el-timeline-item__timestamp{
  font-size: 14px;
  color: green;
}
</style>

<style scoped>
</style>