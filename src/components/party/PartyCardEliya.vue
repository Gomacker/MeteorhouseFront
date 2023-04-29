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
  party: Object,
  hidden_replacement: {
    type: Boolean,
    require: false,
    default: true
  }
})
// const party = ref(JSON.parse(JSON.stringify(props.party)))
// const party_debug = ref(JSON.stringify(props.party))
const allow_mb2_lv = [0,1,2,3,4,5]
const replacement_size = '36px'
const show_replacements = ref(false)

function getParamReplacements(p, union, pos) {
  if (!('params' in p) || !('replacements' in p['params'])) return []
  let rps = p['params']['replacements']
  if (union in rps) {
    rps = rps[union]
    if ('main' in rps || 'armament' in rps || 'unison' in rps || 'core' in rps) {
      // console.log(rps)
      pos = {0: 'main', 1: 'unison', 2: 'armament', 3: 'core'}[pos]
      return pos in rps ? rps[pos] : []

    }
    else if (pos in rps) {
      return rps[pos]
    } else return []
  }
  else return []
}

</script>
<template>
<div class="party" style="display: flex;"
     @mouseenter="show_replacements = true" @mouseleave="show_replacements = false">

<!--  {{ show_replacements }}-->
  <div v-if="party" class="union" v-for="union in ['union1', 'union2', 'union3']">
    <div class="wfo-slot main"
         :class="[unit_data.hasOwnProperty(party['party'][union][0]) ? 'ele-' + getElementCss(unit_data[party['party'][union][0]]['element']) : '']">
      <div v-if="(!hidden_replacement) || (hidden_replacement && show_replacements)" style="position: absolute; display: flex; flex-wrap: wrap;" :style="{width: 'calc(3 * ' + replacement_size + ')', top: 'calc( -' + replacement_size + ')', left: 'calc( -' + replacement_size + ' / 2)'}">
        <img
            v-for="rpm in getParamReplacements(party, union, 0)"
            style="
            z-index: 15;
            filter: drop-shadow(0 0 3px black);
            "
            :style="{width: replacement_size, height: replacement_size}"
            :src="getUnitPicUrl(unit_data[rpm])"
            alt=""
        />
      </div>
      <div
          style="
            position: absolute;
            z-index: 2;
            background-color: coral;
            width: 16px;
            text-align: center;
            color: white;
          "
          v-if="hidden_replacement && getParamReplacements(party, union, 0).length > 0"
      >
        R
      </div>
      <img :src="getUnitPicUrl(unit_data[party['party'][union][0]])" alt="" loading="lazy" @dragstart.prevent/>
      <div>
        <div
            style="text-align: center; padding-top: 2px;"
            v-if="
              party &&
              party['params'] &&
              party['params']['manaboard2'] &&
              party['params']['manaboard2'][union] &&
              (typeof party['params']['manaboard2'][union][0]) === 'object' &&
              (
                  allow_mb2_lv.includes(party['params']['manaboard2'][union][0][0]) ||
                  allow_mb2_lv.includes(party['params']['manaboard2'][union][0][1]) ||
                  allow_mb2_lv.includes(party['params']['manaboard2'][union][0][2])
              )
            "
        >
          {{ allow_mb2_lv.includes(party['params']['manaboard2'][union][0][0]) ? party['params']['manaboard2'][union][0][0] : '-' }}
           /
          {{ allow_mb2_lv.includes(party['params']['manaboard2'][union][0][1]) ? party['params']['manaboard2'][union][0][1] : '-' }}
           /
          {{ allow_mb2_lv.includes(party['params']['manaboard2'][union][0][2]) ? party['params']['manaboard2'][union][0][2] : '-' }}
        </div>
        <div v-else style="text-align: center;">
          {{ union === 'union1' ? '队长' : '主要角色' }}
        </div>
      </div>
    </div>
    <div class="wfo-slot armament">
      <div v-if="(!hidden_replacement) || (hidden_replacement && show_replacements)" style="position: absolute; display: flex; flex-wrap: wrap;" :style="{width: 'calc(3 * ' + replacement_size + ')', top: 'calc( -' + replacement_size + ')', left: 'calc( -' + replacement_size + ' / 2)'}">
        <img
            v-for="rpm in getParamReplacements(party, union, 2)"
            style="z-index: 15;
            filter: drop-shadow(0 0 3px black);"
            :style="{width: replacement_size, height: replacement_size}"
            :src="getArmamentPicUrl(armament_data[rpm])"
            alt=""
        />
      </div>
      <div
          style="
            position: absolute;
            z-index: 2;
            background-color: coral;
            width: 16px;
            text-align: center;
            color: white;
          "
          v-if="hidden_replacement && getParamReplacements(party, union, 2).length > 0"
      >
        R
      </div>
      <img :src="getArmamentPicUrl(armament_data[party['party'][union][2]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">装备</div>
    </div>
    <div class="wfo-slot unison"
         :class="[unit_data.hasOwnProperty(party['party'][union][1]) ? 'ele-' + getElementCss(unit_data[party['party'][union][1]]['element']) : '']">

      <div
          style="
            position: absolute;
            z-index: 2;
            background-color: coral;
            width: 16px;
            text-align: center;
            color: white;
          "
          v-if="hidden_replacement && getParamReplacements(party, union, 1).length > 0"
      >
        R
      </div>
      <img :src="getUnitPicUrl(unit_data[party['party'][union][1]])" alt="" loading="lazy" @dragstart.prevent/>

      <div
          style="text-align: center; padding-top: 2px;"
          v-if="
            party &&
            party['params'] &&
            party['params']['manaboard2'] &&
            party['params']['manaboard2'][union] &&
            (typeof party['params']['manaboard2'][union][1]) === 'object' &&
            (
                allow_mb2_lv.includes(party['params']['manaboard2'][union][1][0]) ||
                allow_mb2_lv.includes(party['params']['manaboard2'][union][1][1]) ||
                allow_mb2_lv.includes(party['params']['manaboard2'][union][1][2])
            )
          "
      >
        {{ allow_mb2_lv.includes(party['params']['manaboard2'][union][1][0]) ? party['params']['manaboard2'][union][1][0] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2'][union][1][1]) ? party['params']['manaboard2'][union][1][1] : '-' }}
        /
        {{ allow_mb2_lv.includes(party['params']['manaboard2'][union][1][2]) ? party['params']['manaboard2'][union][1][2] : '-' }}
      </div>
      <div v-else style="text-align: center;">辅助角色</div>

      <div v-if="(!hidden_replacement) || (hidden_replacement && show_replacements)" style="display: flex; flex-wrap: wrap;" :style="{width: 'calc(3 * ' + replacement_size + ')', top: 'calc( 24px -' + replacement_size + ' / 2)', left: 'calc( -' + replacement_size + ' / 2)'}">
        <img
            v-for="rpm in getParamReplacements(party, union, 1)"
            style="z-index: 15;
            filter: drop-shadow(0 0 3px black);"
            :style="{width: replacement_size, height: replacement_size}"
            :src="getUnitPicUrl(unit_data[rpm])"
            alt=""
        />
      </div>
    </div>
    <div class="wfo-slot core">
      <div
          style="
            position: absolute;
            z-index: 2;
            background-color: coral;
            width: 16px;
            text-align: center;
            color: white;
          "
          v-if="hidden_replacement && getParamReplacements(party, union, 3).length > 0"
      >
        R
      </div>
      <img :src="getArmamentCorePicUrl(armament_data[party['party'][union][3]])" alt="" loading="lazy" @dragstart.prevent/>
      <div style="text-align: center;">魂珠</div>
      <div v-if="(!hidden_replacement) || (hidden_replacement && show_replacements)" style="display: flex; flex-wrap: wrap;" :style="{width: 'calc(3 * ' + replacement_size + ')', top: 'calc( -' + replacement_size + ')', left: 'calc( -' + replacement_size + ' / 2)'}">
        <img
            v-for="rpm in getParamReplacements(party, union, 3)"
            style="z-index: 15;
            filter: drop-shadow(0 0 2px black);"
            :style="{width: replacement_size, height: replacement_size}"
            :src="getArmamentCorePicUrl(armament_data[rpm])"
            alt=""
        />
      </div>
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