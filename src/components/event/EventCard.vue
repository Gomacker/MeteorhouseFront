<script setup>
defineProps({
  event: {}
})
</script>
<template>
<!--  {{ event }}-->
<el-card body-style="padding: 0"
         style="min-width: fit-content; margin: 4px;"
         :style="{'background-color': event.background_color}"
>
  <el-image :src="event.image_url"
            style="width: 200px; height: 115px; display: block;" fit="cover"
            loading="lazy"
  >
  </el-image>
  <div style="padding: 4px 8px; font-size: 8px; width: 200px; overflow-x: hidden;">
    <div class="event-card-title">{{ event.title }}</div>
    <div class="event-card-description">
      <p v-for="r in event.description.split('\n')">{{ r }}</p>
    </div>
  </div>
</el-card>
</template>

<script>
export default {
  name: "EventCard"
}
</script>

<style scoped>

.event-card-title {
  font-weight: bold;
  font-size: 17px;
}
.event-card-description {
  /*color: darkgray;*/
  color: gray;
}
</style>