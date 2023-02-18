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
import {ref} from "vue";

const props = defineProps({
  party: Object
})
const party = ref(JSON.parse(JSON.stringify(props.party)))
const party_debug = ref(JSON.stringify(props.party))
const allow_mb2_lv = [0,1,2,3,4,5]
if (props.party.hasOwnProperty('replacements')) {

}

</script>
<template>
<!--{{ party['params'] }}-->
<!--  <el-input style="font-family: Consolas, serif;" type="textarea" :rows="4" v-model="party_debug"/>-->
<!--  <el-button type="primary" @click="party = JSON.parse(party_debug)">Test</el-button>-->
<div class="party" style="display: flex;">
  <div class="union">
    <div class="wfo-slot main"
         :class="[unit_data.hasOwnProperty(party['party']['union1'][0]) ? 'ele-' + getElementCss(unit_data[party['party']['union1'][0]]['element']) : '']">
      <img :src="getUnitPicUrl(unit_data[party['party']['union1'][0]])" alt="" loading="lazy" @dragstart.prevent/>
      <div>
<!--        {{ party['params']['manaboard2'] }}-->
<!--        {{ party['params']['manaboard2']['union1'] }}-->
<!--        {{ (typeof party['params']['manaboard2']['union1']) === 'object' }}-->
        <div
            style="text-align: center; padding-top: 2px;"
            v-if="
              party &&
              party['params'] &&
              party['params']['manaboard2'] &&
              party['params']['manaboard2']['union1'] &&
              (typeof party['params']['manaboard2']['union1'][0]) === 'object' &&
              (
                  allow_mb2_lv.includes(party['params']['manaboard2']['union1'][0][0]) ||
                  allow_mb2_lv.includes(party['params']['manaboard2']['union1'][0][1]) ||
                  allow_mb2_lv.includes(party['params']['manaboard2']['union1'][0][2])
              )
            "
        >
          {{ allow_mb2_lv.includes(party['params']['manaboard2']['union1'][0][0]) ? party['params']['manaboard2']['union1'][0][0] : '-' }}
           /
          {{ allow_mb2_lv.includes(party['params']['manaboard2']['union1'][0][1]) ? party['params']['manaboard2']['union1'][0][1] : '-' }}
           /
          {{ allow_mb2_lv.includes(party['params']['manaboard2']['union1'][0][2]) ? party['params']['manaboard2']['union1'][0][2] : '-' }}
        </div>
        <div v-else style="text-align: center;">队长</div>
      </div>
    </div>
    <div class="wfo-slot armament">
      <img :src="getArmamentPicUrl(armament_data[party['party']['union1'][2]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">装备</div>
    </div>
    <div class="wfo-slot unison"
         :class="[unit_data.hasOwnProperty(party['party']['union1'][1]) ? 'ele-' + getElementCss(unit_data[party['party']['union1'][1]]['element']) : '']">
      <img :src="getUnitPicUrl(unit_data[party['party']['union1'][1]])" alt="" loading="lazy" @dragstart.prevent/>

      <div
          style="text-align: center; padding-top: 2px;"
          v-if="
            party &&
            party['params'] &&
            party['params']['manaboard2'] &&
            party['params']['manaboard2']['union1'] &&
            (typeof party['params']['manaboard2']['union1'][1]) === 'object' &&
            (
                allow_mb2_lv.includes(party['params']['manaboard2']['union1'][1][0]) ||
                allow_mb2_lv.includes(party['params']['manaboard2']['union1'][1][1]) ||
                allow_mb2_lv.includes(party['params']['manaboard2']['union1'][1][2])
            )
          "
      >
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union1'][1][0]) ? party['params']['manaboard2']['union1'][1][0] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union1'][1][1]) ? party['params']['manaboard2']['union1'][1][1] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union1'][1][2]) ? party['params']['manaboard2']['union1'][1][2] : '-' }}
      </div>
      <div v-else style="text-align: center;">辅助角色</div>
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

      <div
          style="text-align: center; padding-top: 2px;"
          v-if="
            party &&
            party['params'] &&
            party['params']['manaboard2'] &&
            party['params']['manaboard2']['union2'] &&
            (typeof party['params']['manaboard2']['union2'][0]) === 'object' &&
            (
                allow_mb2_lv.includes(party['params']['manaboard2']['union2'][0][0]) ||
                allow_mb2_lv.includes(party['params']['manaboard2']['union2'][0][1]) ||
                allow_mb2_lv.includes(party['params']['manaboard2']['union2'][0][2])
            )
          "
      >
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union2'][0][0]) ? party['params']['manaboard2']['union2'][0][0] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union2'][0][1]) ? party['params']['manaboard2']['union2'][0][1] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union2'][0][2]) ? party['params']['manaboard2']['union2'][0][2] : '-' }}
      </div>
      <div v-else style="text-align: center;">主要角色</div>
    </div>
    <div class="wfo-slot armament">
      <img :src="getArmamentPicUrl(armament_data[party['party']['union2'][2]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">装备</div>
    </div>
    <div class="wfo-slot unison"
         :class="[unit_data.hasOwnProperty(party['party']['union2'][1]) ? 'ele-' + getElementCss(unit_data[party['party']['union2'][1]]['element']) : '']">
      <img :src="getUnitPicUrl(unit_data[party['party']['union2'][1]])" alt="" loading="lazy" @dragstart.prevent/>

      <div
          style="text-align: center; padding-top: 2px;"
          v-if="
            party &&
            party['params'] &&
            party['params']['manaboard2'] &&
            party['params']['manaboard2']['union2'] &&
            (typeof party['params']['manaboard2']['union2'][1]) === 'object' &&
            (
                allow_mb2_lv.includes(party['params']['manaboard2']['union2'][1][0]) ||
                allow_mb2_lv.includes(party['params']['manaboard2']['union2'][1][1]) ||
                allow_mb2_lv.includes(party['params']['manaboard2']['union2'][1][2])
            )
          "
      >
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union2'][1][0]) ? party['params']['manaboard2']['union2'][1][0] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union2'][1][1]) ? party['params']['manaboard2']['union2'][1][1] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union2'][1][2]) ? party['params']['manaboard2']['union2'][1][2] : '-' }}
      </div>
      <div v-else style="text-align: center;">辅助角色</div>
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

      <div
          style="text-align: center; padding-top: 2px;"
          v-if="
            party &&
            party['params'] &&
            party['params']['manaboard2'] &&
            party['params']['manaboard2']['union3'] &&
            (typeof party['params']['manaboard2']['union3'][0]) === 'object' &&
            (
                allow_mb2_lv.includes(party['params']['manaboard2']['union3'][0][0]) ||
                allow_mb2_lv.includes(party['params']['manaboard2']['union3'][0][1]) ||
                allow_mb2_lv.includes(party['params']['manaboard2']['union3'][0][2])
            )
          "
      >
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union3'][0][0]) ? party['params']['manaboard2']['union3'][0][0] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union3'][0][1]) ? party['params']['manaboard2']['union3'][0][1] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union3'][0][2]) ? party['params']['manaboard2']['union3'][0][2] : '-' }}
      </div>
      <div v-else style="text-align: center;">主要角色</div>
    </div>
    <div class="wfo-slot armament">
      <img :src="getArmamentPicUrl(armament_data[party['party']['union3'][2]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">装备</div>
    </div>
    <div class="wfo-slot unison"
         :class="[unit_data.hasOwnProperty(party['party']['union3'][1]) ? 'ele-' + getElementCss(unit_data[party['party']['union3'][1]]['element']) : '']">
      <img :src="getUnitPicUrl(unit_data[party['party']['union3'][1]])" alt="" loading="lazy" @dragstart.prevent/>

      <div
          style="text-align: center; padding-top: 2px;"
          v-if="
            party &&
            party['params'] &&
            party['params']['manaboard2'] &&
            party['params']['manaboard2']['union3'] &&
            (typeof party['params']['manaboard2']['union3'][1]) === 'object' &&
            (
                allow_mb2_lv.includes(party['params']['manaboard2']['union3'][1][0]) ||
                allow_mb2_lv.includes(party['params']['manaboard2']['union3'][1][1]) ||
                allow_mb2_lv.includes(party['params']['manaboard2']['union3'][1][2])
            )
          "
      >
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union3'][1][0]) ? party['params']['manaboard2']['union3'][1][0] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union3'][1][1]) ? party['params']['manaboard2']['union3'][1][1] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2']['union3'][1][2]) ? party['params']['manaboard2']['union3'][1][2] : '-' }}
      </div>
      <div v-else style="text-align: center;">辅助角色</div>
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