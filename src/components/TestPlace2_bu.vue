<script setup>
import UnitPicInfo from "@/components/party/components/UnitPicInfo.vue";
import UnitPicOrigin from "@/components/party/components/UnitPicOrigin.vue";
import PartyCardEliya from "@/components/party/PartyCardEliya.vue";
import {unit_data} from "@/components/party_manager";
import {ArrowDownBold, DocumentCopy} from "@element-plus/icons-vue";
import {onMounted} from "vue";

const up_data_fire = [
  [252, 258],
  [266, 267],
  [276],
  [281],
  [],
  [292]
]
const up_data_water = [
  [248, 249],
  [262, 271, 275],
  [],
  [],
  [],
  [289, 294]
]
const up_data_thunder = [
  [259, 260],
  [270],
  [277],
  [283],
  [285],
  [],
]
const up_data_wind = [
  [253, 250, 254],
  [272, 264],
  [278],
  [],
  [287],
  [290]
]
const up_data_light = [
  [256, 257, 255],
  [268, 265, 274],
  [],
  [],
  [286, 288],
  [],
]
const up_data_dark = [
  [251, 261],
  [273, 263, 269],
  [279, 280],
  [282, 284],
  [],
  [291, 293]
]
const up_datas = {
  'fire': up_data_fire,
  'water': up_data_water,
  'thunder': up_data_thunder,
  'wind': up_data_wind,
  'light': up_data_light,
  'dark': up_data_dark,
}

const chars = {'fire': [3, 133, 143, 4, 5, 252, 258], 'water': [127, 152, 161, 236, 139, 7, 6], 'thunder': [134, 144, 166, 170, 9, 8, 259], 'wind': [177, 222, 140, 188, 13, 11, 10, 157, 253], 'light': [202, 203, 178, 16, 148, 147, 162, 192, 14, 15], 'dark': [223, 218, 179, 172, 128, 17, 18, 153]}

const alpha = 0.85;
const ele2color = {
  'fire': 'rgba(234,53,75,' + alpha + ')',
  'water': 'rgb(68,137,255,' + alpha + ')',
  'thunder': 'rgb(244,204,36,' + alpha + ')',
  'wind': 'rgb(119,217,47,' + alpha + ')',
  'light': 'rgb(245,255,186,' + alpha + ')',
  'dark': 'rgb(90,57,95,' + alpha + ')',
}
const ele2border_color = {
  'fire': 'rgb(234,53,75)',
  'water': 'rgb(68,137,255)',
  'thunder': 'rgb(244,204,36)',
  'wind': 'rgb(119,217,47)',
  'light': 'rgb(136,136,136)',
  'dark': 'rgb(90,57,95)',
}
const ele2name = {
  'fire': '火属性',
  'water': '水属性',
  'thunder': '雷属性',
  'wind': '风属性',
  'light': '光属性',
  'dark': '暗属性',
}
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
</script>

<template>
  <el-card class="party-card" body-style="padding: 12px 8px 8px;" style="margin: 8px 4px; /* width: fit-content */ width: 498px;">
    <div style="display: flex; justify-content: space-between;">
      <div><span style="font-weight: bold; font-size: 18px;">连击水能力 能力水 ab水</span><span style="color: darkgray;">(HaJiuHaJiu)</span></div>
      <div><span style="color: gray;">Phoebe</span></div>
    </div>
    <PartyCardEliya :party="
    {'party':{'union1':[9901,0,0,0],'union2':[0,0,0,0],'union3':[0,0,0,0]},'params':{'replacements':{'union1':[[],[],[],[]],'union2':[[],[],[],[]],'union3':[[],[],[],[]]},'manaboard2':{'union1':[[-1,-1,-1],[-1,-1,-1]],'union2':[[-1,-1,-1],[-1,-1,-1]],'union3':[[-1,-1,-1],[-1,-1,-1]]}}}
    "></PartyCardEliya>
    <div style="display: flex; justify-content: space-between;">
            <div/>
            <div>
              <el-button-group style="margin: 0 2px;">
                <!--            <el-button size="default" style="color: deeppink; padding-right: 64px;">-->
                <el-button disabled size="small" style="color: deeppink;">
                  <div style="width: 100%; height: 100%; position: absolute;"></div>
                  <div>❤ 114</div>
                </el-button>
                <el-button disabled size="small">
                  <el-icon><ArrowDownBold /></el-icon>
                </el-button>
              </el-button-group>
              <el-button size="small" type="warning" style="margin: 0 2px;">
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </div>
          </div>
  </el-card>
  <el-card class="party-card" body-style="padding: 12px 8px 8px;" style="margin: 8px 4px; /* width: fit-content */ width: 498px;">
    <div style="display: flex; justify-content: space-between;">
      <div><span style="font-weight: bold; font-size: 18px;">能力水</span><span style="color: darkgray;">(HaJiuHaJiu)</span></div>
      <div><span style="color: gray;">Phoebe</span></div>
    </div>
    <div style="display: flex; flex-wrap: wrap; margin: 4px 0;">
      <el-tag effect="dark" style="margin: 2px;">
        连击
      </el-tag>
      <el-tag effect="dark" type="warning" style="margin: 2px;">
        水
      </el-tag>
      <el-tag effect="dark" type="success" style="margin: 2px;">
        能力伤害
      </el-tag>
      <el-tag effect="dark" type="danger" style="margin: 2px;">
        猫头鹰 初级 对策
      </el-tag>
      <el-tag effect="dark" type="danger" style="margin: 2px;">
        废墟魔像 中级 对策
      </el-tag>
      <el-tag effect="dark" type="info" style="margin: 2px;">
        若叶
      </el-tag>
    </div>
    <el-divider style="margin: 4px 0;"></el-divider>
<!--    <hr style="border-color: red;"/>-->
    <PartyCardEliya :party="
    {'party':{'union1':[9901,0,0,0],'union2':[0,0,0,0],'union3':[0,0,0,0]},'params':{'replacements':{'union1':[[],[],[],[]],'union2':[[],[],[],[]],'union3':[[],[],[],[]]},'manaboard2':{'union1':[[-1,-1,-1],[-1,-1,-1]],'union2':[[-1,-1,-1],[-1,-1,-1]],'union3':[[-1,-1,-1],[-1,-1,-1]]}}}
    "></PartyCardEliya>
    <div style="display: flex; justify-content: space-between;">
      <el-popover
        placement="bottom-start"
        :width="240"
      >
        <template #default>
          <span>abaabaabaaba</span>
          <div>
            这里是Description！（不过只有一条啦不会有其他人的评论之类的，但是记录会允许用户追加）
          </div>
        </template>
        <template #reference>
          <el-alert show-icon :closable="false" style="max-width: 160px; height: 24px;">
            abaabaaaba……
          </el-alert>
        </template>
      </el-popover>
      <div>
        <el-button-group style="margin: 0 2px;">
          <!--            <el-button size="default" style="color: deeppink; padding-right: 64px;">-->
          <el-button disabled size="small" style="color: deeppink;">
            <div style="width: 100%; height: 100%; position: absolute;"></div>
            <div>❤ 0</div>
          </el-button>
          <el-button size="small" type="primary" plain>
            添加记录
            <el-icon><ArrowDownBold /></el-icon>
          </el-button>
        </el-button-group>
        <el-button size="small" type="warning" style="margin: 0 2px;">
          <el-icon><DocumentCopy /></el-icon>
        </el-button>
      </div>
    </div>
  </el-card>
  <div style="
      /* background: url(/assets/worldflipper/ui/background_cut_official.png); */
      background-size: 136px;
      background-position-x: -10px;
      background-position-y: -10px;
      image-rendering: pixelated;
      width: fit-content;
      padding: 16px;
      border-radius: 16px;
      box-shadow: 0 0 8px #000000a5;
">
  <div
      style="
        display: flex;
        width: 1036px;
        padding: 16px 0;
        /*background-color: #00ff00;*/
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        background: url(/assets/worldflipper/ui/background_cut_official.png);
        background-size: 136px;
        background-position-x: -10px;
        background-position-y: -10px;
        image-rendering: pixelated;
        align-items: flex-start;
      "
      v-for="ind in 6"
  >


    <template
        v-for="(up_data, element_id) in up_datas">
        <div
              v-if="Object.keys(unit_data).length && up_data[ind - 1].length !== 0"
              style="
                width: 480px;
                margin: 8px;
                display: flex;
                image-rendering: initial;
                flex-direction: row;
                /*background-color: rgb(234,53,75);*/
                /*padding: 16px;*/
                /*padding: 3px;*/
                border-radius: 16px;
                font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              "
              :style="{
                'background-color': ele2color[element_id]
              }"
          >
            <div
                style="
                  background-color: white;
                  width: 31px;
                  border-top-left-radius: 13px;
                  border-bottom-left-radius: 13px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  border: 3px solid;
                  box-sizing: content-box;
                "
                :style="
                {
                  'border-color': ele2border_color[element_id],
                  // 'color': element_id === 'light' ? 'rgb(136,136,136)' : 'white'
                }
                "
            >
              <img style="width: 28px; height: 28px;" :src="'/assets/worldflipper/icon/' + element_id + '.png'" alt=""/>
              <p style="font-size: 24px; width: 24px; line-height: 28px; font-weight: bold; color: black;">
                {{ ele2name[element_id] }}
              </p>
            </div>
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: center;
                width: 100%;
                padding: 18px 28px 18px 16px;
                /*color: white;*/
                /*color: black;*/
                font-weight: 500;
              "
              :style="
              {
                'color': (['light'].includes(element_id)) ? 'rgb(50,50,50)' : 'rgb(250,250,250)'
              }
              "
            >
              <div v-for="i in up_data[ind - 1]" style="padding: 4px; width: fit-content;">
                <UnitPicOrigin :unit="unit_data[i]" :size="90" :awakened="true">
                  aa
                </UnitPicOrigin>
                <div style="font-size:18px; font-weight: 600; text-align: center;">
                  {{ unit_data[i].name[0] }}
                </div>
              </div>
            </div>
          </div>
      </template>
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