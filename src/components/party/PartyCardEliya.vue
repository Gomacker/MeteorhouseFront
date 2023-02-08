<script setup>
import {
  unit_data,
  getElementCss,
  getUnitPicUrl,
  getArmamentPicUrl,
  armament_data,
  getArmamentCorePicUrl
} from "@/components/party_manager";
import '@/assets/summary_table.css'

const props = defineProps({
  party: Object
})

if (props.party.hasOwnProperty('replacements')) {

}

</script>
<template>
<!--{{ party['params'] }}-->
<div class="party" style="display: flex;">
  <div class="union">
    <div class="wfo-slot main"
         :class="[unit_data.hasOwnProperty(party['party']['union1'][0]) ? 'ele-' + getElementCss(unit_data[party['party']['union1'][0]]['element']) : '']">
      <img :src="getUnitPicUrl(unit_data[party['party']['union1'][0]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">队长</div>
    </div>
    <div class="wfo-slot armament">
      <img :src="getArmamentPicUrl(armament_data[party['party']['union1'][2]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">装备</div>
    </div>
    <div class="wfo-slot unison"
         :class="[unit_data.hasOwnProperty(party['party']['union1'][1]) ? 'ele-' + getElementCss(unit_data[party['party']['union1'][1]]['element']) : '']">
      <img :src="getUnitPicUrl(unit_data[party['party']['union1'][1]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">辅助角色</div>
    </div>
    <div class="wfo-slot core">
      <img :src="getArmamentCorePicUrl(armament_data[party['party']['union1'][3]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">魂珠</div>
    </div>
  </div>
  <div class="union">
    <div class="wfo-slot main"
         :class="[unit_data.hasOwnProperty(party['party']['union2'][0]) ? 'ele-' + getElementCss(unit_data[party['party']['union2'][0]]['element']) : '']">
      <img :src="getUnitPicUrl(unit_data[party['party']['union2'][0]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">主要角色</div>
    </div>
    <div class="wfo-slot armament">
      <img :src="getArmamentPicUrl(armament_data[party['party']['union2'][2]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">装备</div>
    </div>
    <div class="wfo-slot unison"
         :class="[unit_data.hasOwnProperty(party['party']['union2'][1]) ? 'ele-' + getElementCss(unit_data[party['party']['union2'][1]]['element']) : '']">
      <img :src="getUnitPicUrl(unit_data[party['party']['union2'][1]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">辅助角色</div>
    </div>
    <div class="wfo-slot core">
      <img :src="getArmamentCorePicUrl(armament_data[party['party']['union2'][3]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">魂珠</div>
    </div>
  </div>
  <div class="union">
    <div class="wfo-slot main"
         :class="[unit_data.hasOwnProperty(party['party']['union3'][0]) ? 'ele-' + getElementCss(unit_data[party['party']['union3'][0]]['element']) : '']">
      <img :src="getUnitPicUrl(unit_data[party['party']['union3'][0]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">主要角色</div>
    </div>
    <div class="wfo-slot armament">
      <img :src="getArmamentPicUrl(armament_data[party['party']['union3'][2]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">装备</div>
    </div>
    <div class="wfo-slot unison"
         :class="[unit_data.hasOwnProperty(party['party']['union3'][1]) ? 'ele-' + getElementCss(unit_data[party['party']['union3'][1]]['element']) : '']">
      <img :src="getUnitPicUrl(unit_data[party['party']['union3'][1]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">辅助角色</div>
    </div>
    <div class="wfo-slot core">
      <img :src="getArmamentCorePicUrl(armament_data[party['party']['union3'][3]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">魂珠</div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: "PartyCardEliya",
  data() {
    return {
      blank: '/api/static/worldflipper/unit/blank.png'
    }
  }
}
</script>

<style scoped>
.wfo-slot {
  cursor: auto;
}
</style>