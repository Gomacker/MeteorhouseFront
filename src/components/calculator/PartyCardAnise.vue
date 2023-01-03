<script setup>
import {unit_data, armament_data, getUnitPicUrl, getArmamentPicUrl, getArmamentCorePicUrl} from "@/components/party_manager";
defineProps({
  party: Object
})
</script>
<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <span style="color: blue;">{{ Object.keys(unit_data).length }} units loaded</span>
    <span style="color: blue;">{{ Object.keys(armament_data).length }} armaments loaded</span>
    <el-card class="party-card-anise" style="width: fit-content; background: rgb(0, 255, 0);" body-style="display: flex; padding: 0;">
  <!--    <div style="flex: 1;">-->
  <!--      <el-image style="width: 82px;" :src="getUnitPicUrl(unit_data[party['union1'][0]])"></el-image>-->
  <!--    </div>-->
      <div style="height: 190px; width: 150px;">
        <div class="main">
  <!--        <div style="z-index: 1;">-->
  <!--          <img src="" style="position:absolute; width: 16px; height: 16px; background: red;" loading="lazy" alt=""/>-->
  <!--        </div>-->
          <el-image style="width: 82px;" :src="getUnitPicUrl(unit_data[party['union1'][0]])"></el-image>
          <div style="text-align: center;">Leader</div>
        </div>
        <div class="unison">
  <!--        <div style="z-index: 1;">-->
  <!--          <img src="" style="position:absolute; width: 16px; height: 16px; background: red;" loading="lazy" alt=""/>-->
  <!--        </div>-->
          <el-image style="width: 62px;" :src="getUnitPicUrl(unit_data[party['union1'][1]])"/>
          <div style="text-align: center;">Unison</div>
        </div>
        <div class="armament">
          <el-image style="width: 54px;" :src="getArmamentPicUrl(armament_data[party['union1'][2]])"/>
          <div style="text-align: center;">Arma</div>
        </div>
        <div class="core">
          <el-image style="width: 54px;" :src="getArmamentCorePicUrl(armament_data[party['union1'][3]])"/>
          <div style="text-align: center;">Core</div>
        </div>
      </div>
      <div style="height: 190px; width: 150px;">
        <div class="main">
          <el-image style="width: 82px;" :src="getUnitPicUrl(unit_data[party['union2'][0]])"></el-image>
          <div style="text-align: center;">Main</div>
        </div>
        <div class="unison">
          <el-image style="width: 62px;" :src="getUnitPicUrl(unit_data[party['union2'][1]])"/>
          <div style="text-align: center;">Unison</div>
        </div>
        <div class="armament">
          <el-image style="width: 54px;" :src="getArmamentPicUrl(armament_data[party['union2'][2]])"/>
          <div style="text-align: center;">Arma</div>
        </div>
        <div class="core">
          <el-image style="width: 54px;" :src="getArmamentCorePicUrl(armament_data[party['union2'][3]])"/>
          <div style="text-align: center;">Core</div>
        </div>
      </div>
      <div style="height: 190px; width: 150px;">
        <div class="main">
          <el-image style="width: 82px;" :src="getUnitPicUrl(unit_data[party['union3'][0]])"></el-image>
          <div style="text-align: center;">Main</div>
        </div>
        <div class="unison">
          <el-image style="width: 62px;" :src="getUnitPicUrl(unit_data[party['union3'][1]])"/>
          <div style="text-align: center;">Unison</div>
        </div>
        <div class="armament">
          <el-image style="width: 54px;" :src="getArmamentPicUrl(armament_data[party['union3'][2]])"/>
          <div style="text-align: center;">Arma</div>
        </div>
        <div class="core">
          <el-image style="width: 54px;" :src="getArmamentCorePicUrl(armament_data[party['union3'][3]])"/>
          <div style="text-align: center;">Core</div>
        </div>
      </div>
  <!--    <div style="flex: 1;">b</div>-->
  <!--    <div style="flex: 1;">c</div>-->
    </el-card>
    {{ party }}
  </div>
</template>

<script>
export default {
  name: "PartyCard"
}
</script>

<style>
/*.party-card-anise{*/
/*  border: blue solid 1px;*/

/*}*/
</style>

<style scoped>
/*.party-card-anise:deep(div){*/
/*  border: blue solid 1px;*/
/*}*/
/*.party-card-anise{*/
/*  border: blue solid 1px;*/
/*}*/
.party-card-anise{
  font-size: 8px;
}
.party-card-anise:deep(div){
  margin: 0 !important;
  /*background-color: rgb(0, 255, 0);*/
}
.party-card-anise:deep(.main) {
  position: absolute;
  height: fit-content;
  top: 2%;
  left: 2%;
  background-color: #fff;
  padding: 3px;
  border-radius: 4px;
  box-shadow: black 0 0 2px;
  box-sizing: content-box;
  width: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.party-card-anise:deep(.unison) {
  position: absolute;
  height: fit-content;
  /*top: 55%;*/
  /*left: 53%;*/
  bottom: 2%;
  right: 2%;
  background-color: #fff;
  padding: 3px;
  border-radius: 4px;
  box-shadow: black 0 0 2px;
  box-sizing: content-box;
  width: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.party-card-anise:deep(.armament) {
  position: absolute;
  height: fit-content;
  top: 8%;
  /*left: 58%;*/
  right: 2%;
  background-color: #fff;
  padding: 3px;
  border-radius: 4px;
  box-shadow: black 0 0 2px;
  box-sizing: content-box;
  width: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.party-card-anise:deep(.core) {
  position: absolute;
  height: fit-content;
  /*top: 60%;*/
  left: 7.5%;
  bottom: 2%;
  /*background-color: #fff;*/
  padding: 3px;
  border-radius: 4px;
  /*box-shadow: black 0 0 2px;*/
  box-sizing: content-box;
  width: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>