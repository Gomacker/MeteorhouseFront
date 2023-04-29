<script setup>
import UnitPicOrigin from "@/components/party/components/UnitPicOrigin.vue";
import {armament_data, unit_data} from "@/components/party_manager";
import ArmamentPicOrigin from "@/components/party/components/ArmamentPicOrigin.vue";

function splitByBrackets(str) {
  // str = '<p style="padding-bottom: 2px; padding-top: 2px; width: 100%; min-width: 100%;">' + str + '</p>'
  // str = '</span><span style="padding-bottom: 5px;">' + str
  str = str.replaceAll('\n', '</span><span style="padding-bottom: 5px;">')
  str = str.replaceAll('[novice]', '</span><span class="novice" style="padding-bottom: 5px;">')
  str = str.replaceAll('[highlight]', '</span><span class="highlight" style="padding-bottom: 5px;">')
  str = str.replaceAll('[b]', '<b>')
  str = str.replaceAll('[end]', '</span>')
  str = str.replaceAll('[biliicon]', '<img style="width: 24px; vertical-align: text-bottom; margin: 0 4px;" src="https://www.bilibili.com/favicon.ico" alt=""/>')
  // str = str + '</span><span style="padding-bottom: 5px;">'

  let result = [];
  let bracketed = str.match(/\[.*?]/g) || [];
  let unbracketed = str.split(/\[.*?]/g);
  for (let i = 0; i < unbracketed.length; i++) {
    if (unbracketed[i]) result.push(unbracketed[i]);
    if (i < bracketed.length) result.push(bracketed[i]);
  }
  return result;
}
defineProps({
  content: String
})
</script>
<template>
  <div>
    <div v-for="row in content.split('\n')" style="">
      <template v-for="s in splitByBrackets(row)">
        <UnitPicOrigin style="filter: drop-shadow(0 0 4px black)" v-if="s.startsWith('[bigicon:u') && Object.keys(unit_data).length" :size="90" :unit="unit_data[s.substring(10, s.length - 1)]"/>
        <UnitPicOrigin style="filter: drop-shadow(0 0 2px black)" v-else-if="s.startsWith('[icon:u') && Object.keys(unit_data).length" :size="60" :unit="unit_data[s.substring(7, s.length - 1)]"/>
        <ArmamentPicOrigin style="filter: drop-shadow(0 0 4px black)" v-else-if="s.startsWith('[bigicon:a') && Object.keys(armament_data).length" :size="90" :armament="armament_data[s.substring(10, s.length - 1)]"/>
        <ArmamentPicOrigin style="filter: drop-shadow(0 0 2px black)" v-else-if="s.startsWith('[icon:a') && Object.keys(armament_data).length" :size="60" :armament="armament_data[s.substring(7, s.length - 1)]"/>
        <div style="display: inline;" v-else>
          <span style="padding-top: 6px; padding-bottom: 6px;" v-html="s">

          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>