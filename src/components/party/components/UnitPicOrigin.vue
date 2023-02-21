<script setup>
import {getElementCss, getUnitPicUrl} from "@/components/party_manager";

let width = 240;
let height = 240;
const props = defineProps({
  unit: Object,
  size: Number,
  awakened: Boolean
})
if (props.size) {
  width = props.size
  height = props.size
}
const frame_width = width * 14 / 240
const ele_size = width * 44 / 240
</script>

<template>
<!--  {{ unit }}-->
  <div style="width: fit-content; display: inline-block;" :title="unit['anise_id'] + ': ' + unit['extraction_id'] + ': ' + unit['wf_id']">
    <svg v-if="unit" style="display: block;" :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
        <image
            :href="'/assets/worldflipper/ui/unit_background.png'"
            id="background"
            :height="width - frame_width * 2"
            :width="height - frame_width * 2"
            :y="frame_width" :x="frame_width"
        />
        <image
            v-if="unit['extraction_id']"
            :href="getUnitPicUrl(unit, awakened)"
            id="unit_pic"
            :height="width - frame_width * 2"
            :width="height - frame_width * 2"
            :y="frame_width" :x="frame_width"
        />
        <image
            :href="'/assets/worldflipper/ui/unit_frame.png'"
            id="frame"
            :height="width"
            :width="height"
            y="0" x="0"
        />
        <image
            :href="'/assets/worldflipper/icon/' + getElementCss(unit.element) + '.png'"
            id="element_icon"
            :height="ele_size"
            :width="ele_size"
            :y="frame_width" :x="width - frame_width - ele_size"
        />
        <image
            v-if="unit.rarity"
            :href="'/assets/worldflipper/ui/star_in_frame/star' + unit.rarity + 'inf.png'"
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
  name: "UnitPicOrigin"
}
</script>

<style scoped>

</style>