<script setup>
import {getUnitPicUrl, unit_data} from "@/components/party_manager";
import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps({
  units: Array
})

const unit_index = ref(0)
const unit = ref({})
let timer = null
let count_max = 3
let count = count_max
onMounted(() => {
  timer = setInterval(() => {
    count--
    if (count <= 0) {
      unit_index.value = unit_index.value >= props.units.length - 1 ? 0 : unit_index.value + 1
      unit.value = unit_data.value[props.units[unit_index.value]]
      count = count_max
    }
  }, 1000); //1000毫秒后执行
})

onUnmounted(() => {
  clearInterval(timer);
})
</script>

<template>
  <img class="animation-pic" :src="getUnitPicUrl(unit)" alt=""/>
  {{ unit_index }}
  {{ units }}
  {{ unit }}
  <div v-if="Object.keys(unit_data)">
    <div v-for="u in Object.keys(unit_data)">{{ u }}</div>
  </div>
</template>

<style scoped>

.animation-pic {
  animation: alpha 3s linear infinite;
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