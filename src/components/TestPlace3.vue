<script setup>
import UnitPicInfo from "@/components/party/components/UnitPicInfo.vue";
import UnitPicOrigin from "@/components/party/components/UnitPicOrigin.vue";
import PartyCardEliya from "@/components/party/PartyCardEliya.vue";
import {PartyRelease, unit_data} from "@/components/party_manager";
import {ArrowDownBold, DocumentCopy} from "@element-plus/icons-vue";
import {ref} from "vue";
import PartyReleaseCard from "@/components/PartyReleaseCard.vue";

const alpha = 0.85;
const test_pr = new PartyRelease(
    {
      'party':{
        'union1':[9901,0,0,0],
        'union2':[0,0,0,0],
        'union3':[0,0,0,0]
      },
      'params':{
        'replacements':{
          'union1':[[],[],[],[]],
          'union2':[[],[],[],[]],
          'union3':[[],[],[],[]]
        },
        'manaboard2':{
          'union1':[[-1,-1,-1],[-1,-1,-1]],
          'union2':[[-1,-1,-1],[-1,-1,-1]],
          'union3':[[-1,-1,-1],[-1,-1,-1]]
        }
      },
      'tags': [
        'a'
      ]
    }
);
function format_content(content) {
  let s = '<p>'
  s += content.replaceAll('\n', '</p><p>')
  s += '</p>'
  s = s.replaceAll('火属性', '<img style="width: 18px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_fire.png" alt=""/>')
  s = s.replaceAll('水属性', '<img style="width: 18px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_water.png" alt=""/>')
  s = s.replaceAll('雷属性', '<img style="width: 18px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_thunder.png" alt=""/>')
  s = s.replaceAll('风属性', '<img style="width: 18px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_wind.png" alt=""/>')
  s = s.replaceAll('光属性', '<img style="width: 18px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_light.png" alt=""/>')
  s = s.replaceAll('暗属性', '<img style="width: 18px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_dark.png" alt=""/>')
  s = s.replaceAll('作为主要角色编成：', '<img style="width: 18px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_main.png" alt=""/>')
  return s
}

const content = ref('我是一个一个一个一个菜单啊啊啊啊啊啊啊啊啊啊\n' +
    '换行\n' +
    '换行\n' +
    '火属性水属性雷属性风属性光属性暗属性作为主要角色编成：\n' +
    '<img src="/assets/worldflipper/unit/square212x/base/alk.png" style="width: 106px;" alt=""/>');
const bg_sty = ref('linear-gradient(0deg, rgba(255,255,255,0.75), transparent)');
</script>

<template>
  <PartyReleaseCard :p="test_pr"></PartyReleaseCard>
  <div style="margin: 16px;">
    <el-form-item label="内容">
      <el-input v-model="content" type="textarea" :rows="4"></el-input>
    </el-form-item>
    <el-form-item label="二层背景CSS">
      <el-input style="font-family: Consolas,serif;" v-model="bg_sty" type="textarea" :rows="4"></el-input>
    </el-form-item>
  </div>
  <div style="
      background: url(/assets/worldflipper/ui/background_cut_official.png);
      background-size: 136px;
      background-position-x: -10px;
      background-position-y: -10px;
      image-rendering: pixelated;
      width: fit-content;
      border-radius: 16px;
      box-shadow: 0 0 8px #000000a5;
">
    <div
      style="
        padding: 16px;
        border-radius: 16px;
      "
      :style="{
        background: bg_sty
      }"
    >
      <div
        style="
          display: flex;
          /*width: 1036px;*/
          padding: 16px 0;
          /*background-color: #00ff00;*/
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          font-weight: 700;
          font-size: 20px;
          image-rendering: auto;
        "
        v-html="format_content(content)"
      >
      </div>
    </div>
</div>
</template>

<style scoped>
</style>
<style>
.el-alert .el-alert__description {
  margin: 5px 0;
}
p {
  margin-bottom: 4px;
}
hl {
  background-color: rgba(255, 115, 0, 0.65);
  padding: 0 4px 2px;
  border-radius: 6px;
}
or {
  background-color: rgba(56, 183, 48, 0.65);
  padding: 0 4px 2px;
  border-radius: 6px;
}
</style>