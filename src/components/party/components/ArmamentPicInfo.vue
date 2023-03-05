<script setup>

import {getArmamentPicUrl, getUnitPicUrl} from "@/components/party_manager";

defineProps({
  armament_data: Object
})
</script>

<template>
  <div
      v-if="armament_data"
      style="background-color: white; width: fit-content; padding: 4px; border-radius: 4px; box-shadow: 0 0 2px black;">
<!--    {{ armament_data }}-->
    <img
        style="
          display: block;
          width: 82px;
          height: 82px;
        "
        loading="lazy"
        :src="getArmamentPicUrl(armament_data)"
        alt=""
        :title="armament_data['anise_id'] + ': ' + armament_data['WfExId'] + ': ' + armament_data['wf_id']"
        @dragstart.prevent
    />
    <div style="text-align: center; overflow: hidden; max-width: 82px; height: 1.3em; color: black; font-size: 14px;">
      {{ armament_data['JPName'] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "UnitPicInfo"
}
</script>

<style scoped>

</style>