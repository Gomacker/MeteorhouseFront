<script setup>

import {getUnitPicUrl} from "@/components/party_manager";

defineProps({
  unit_data: Object
})
</script>

<template>
  <div
      v-if="unit_data"
      style="background-color: white; width: fit-content; padding: 4px; border-radius: 4px; box-shadow: 0 0 2px black;">
    <img
        style="
          display: block;
          width: 82px;
          height: 82px;
        "
        loading="lazy"
        :src="getUnitPicUrl(unit_data)"
        alt=""
        :title="unit_data['anise_id'] + ': ' + unit_data['extraction_id']"
    />
    <div style="text-align: center; overflow: hidden; max-width: 82px; height: 1.3em; color: black; font-size: 14px;">{{ unit_data['name'][0] }}</div>
  </div>
</template>

<script>
export default {
  name: "UnitPicInfo"
}
</script>

<style scoped>

</style>