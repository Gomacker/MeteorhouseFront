<script setup>
import {unit_data, armament_data, getUnitPicUrl} from "@/components/party_manager";
defineProps({
  party: Object
})
</script>
<template>
  <span style="color: blue;">{{ Object.keys(unit_data).length }} units loaded</span>
  <span style="color: blue;">, {{ Object.keys(armament_data).length }} armaments loaded</span>
  <el-card class="party-card-anise" style="background: rgb(0, 255, 0);" body-style="display: flex;">
<!--    <div style="flex: 1;">-->
<!--      <el-image style="width: 82px;" :src="getUnitPicUrl(unit_data[party['union1'][0]])"></el-image>-->
<!--    </div>-->
    <div style="flex: 1;">
      <div class="main">
        <div style="z-index: 1;">
          <img src="" style="position:absolute; width: 16px; height: 16px; background: red;" loading="lazy" alt=""/>
        </div>
        <el-image style="width: 82px; background: lightgrey" :src="getUnitPicUrl(unit_data[party['union1'][0]])"></el-image>
        <div style="text-align: center;">队长</div>
      </div>
      <div class="unison"></div>
    </div>
    <div style="flex: 1;">b</div>
    <div style="flex: 1;">c</div>
  </el-card>
  {{ party }}
</template>

<script>
export default {
  name: "PartyCard"
}
</script>

<style scoped>
.party-card-anise:deep(div){
  margin: 0 !important;
  /*background-color: rgb(0, 255, 0);*/
}
.party-card-anise:deep(.main) {
  position: relative;
  top: 2%;
  left: 2%;
  background-color: #fff;
  padding: 3px;
  border-radius: 4px;
  /*border: solid rgba(0, 0, 0, 0.3) 1px;*/
  box-shadow: black 0 0 2px;
  box-sizing: content-box;
  width: fit-content;

  display: flex;
  flex-direction: column;
}
.party-card-anise:deep(.unison) {
  position: relative;
  top: 2%;
  left: 2%;
  background-color: #fff;
  padding: 3px;
  border-radius: 4px;
  /*border: solid rgba(0, 0, 0, 0.3) 1px;*/
  box-shadow: black 0 0 2px;
  box-sizing: content-box;
  width: fit-content;

  display: flex;
  flex-direction: column;
}
</style>