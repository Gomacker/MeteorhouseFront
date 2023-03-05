<script setup>
import {getElementCss, getArmamentPicUrl} from "@/components/party_manager";

let width = 240;
let height = 240;
const props = defineProps({
  armament: Object,
  size: Number,
  soul: Boolean
})
if (props.size) {
  width = props.size
  height = props.size
}
const frame_width = width * 14 / 240
// const ele_size = width * 44 / 240
</script>

<template>

<!--      {{ armament }}-->
  <div style="width: fit-content; display: inline-block;" :title="armament['anise_id'] + ': ' + armament['extraction_id'] + ': ' + armament['wf_id']">
    <svg v-if="armament" style="display: block;" :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
<!--        <image-->
<!--            :href="'/assets/worldflipper/ui/armament_background.png'"-->
<!--            id="background"-->
<!--            :height="width - frame_width * 2"-->
<!--            :width="height - frame_width * 2"-->
<!--            :y="frame_width" :x="frame_width"-->
<!--        />-->
        <image
            v-if="armament['extraction_id']"
            :href="getArmamentPicUrl(armament)"
            id="armament_pic"
            :height="width - frame_width * 2"
            :width="height - frame_width * 2"
            :y="frame_width" :x="frame_width"
        />
        <image
            :href="'/assets/worldflipper/ui/armament_frame.png'"
            id="frame"
            :height="width"
            :width="height"
            y="0" x="0"
        />
        <image
            v-if="armament.rarity"
            :href="'/assets/worldflipper/ui/star_in_frame/star' + armament.rarity + 'inf.png'"
            id="element_icon"
            :height="width"
            :width="height"
            y="0" x="0"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "ArmamentPicOrigin"
}
</script>

<style scoped>

</style>