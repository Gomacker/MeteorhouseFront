<template>
<div style="padding: 16px; width: fit-content;">
  <div
      style="
        width: 720px;
        max-width: 720px;
        min-width: 720px;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.65);
        /*padding: 16px;*/
        background: url(/assets/worldflipper/ui/background_cut_official.png);
        background-size: 136px;
        background-position-x: -10px;
        background-position-y: -10px;
        image-rendering: pixelated;
        border-radius: 16px;
      "
  >
    <div
        style="
          border-radius: 16px;
          padding: 32px;
          font-size: 24px;
        "
    >
      <UnitPicOrigin v-if="Object.keys(unit_data).length" :size="120" :unit="unit_data[1]"/>
    </div>
  </div>
</div>
</template>

<script>
import UnitPicOrigin from "@/components/party/components/UnitPicOrigin.vue";
import {unit_data} from "@/components/party_manager";

export default {
  name: "PlayerInfo",
  computed: {

  },
  data() {
    return {
      unit_data: unit_data
    }
  },
  components: {UnitPicOrigin}
}
</script>

<style scoped>

</style>