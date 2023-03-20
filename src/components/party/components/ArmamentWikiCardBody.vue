<script setup>
import UnitPicOrigin from "@/components/party/components/UnitPicOrigin.vue";
import {getElementCss, format_content} from "@/components/party_manager";
import {show_awakened} from "@/components/party/components/settings";
import ArmamentPicOrigin from "@/components/party/components/ArmamentPicOrigin.vue";
// import {unit_data} from "@/components/party_manager";

const alpha = 0.85;
const ele2color = {
  'none': 'rgb(105,105,105,' + alpha + ')',
  'fire': 'rgba(234,53,75,' + alpha + ')',
  'water': 'rgba(68,137,255,' + alpha + ')',
  'thunder': 'rgba(244,204,36,' + alpha + ')',
  'wind': 'rgba(119,217,47,' + alpha + ')',
  'light': 'rgba(245,255,186,' + alpha + ')',
  'dark': 'rgba(90,57,95,' + alpha + ')',
}
// const a = 'rgb(40,0,115)'
const gender2zh = {
  'Female': '女性',
  'Male': '男性',
  'Unknown': '不明',
  'Ririi': '莉莉',
}
const type2zh = {
  0: '剑士',
  1: '格斗',
  2: '射击',
  3: '辅助',
  4: '特殊',
}
const race2zh = {
  'Human': '人',
  'Beast': '兽',
  'Element': '精灵',
  'Machine': '机械',
  'Dragon': '龙',
  'Mystery': '妖',
  'Undead': '不死',
  'Aquatic': '水栖',
}
function format_race(race) {
  const l = race.split(',');
  if (l[0] === '') l.splice(0, 1);
  for (let i = 0; i < l.length; i++) {
    // }
    // for (let lKey in l) {
    // l[i] = 'a' + l[i];
    l[i] = race2zh[l[i]];
  }
  return l
}

defineProps({
  armament: Object
})

</script>
<template>
<div
    v-if="armament"
    style="
    width: 960px;
    max-width: 960px;
    min-width: 960px;
    /*background-color: greenyellow;*/
    background: url(/assets/worldflipper/ui/background_cut_official.png);
    background-size: 136px;
    background-position-x: -10px;
    background-position-y: -10px;
    image-rendering: pixelated;
    /*margin: 16px;*/
    /*padding: 16px;*/
    border-radius: 16px;
    "
>
<!--  {{ unit }}-->
  <div
    style="border-radius: 16px; background-position: 150% 80%; background-size: 720px; image-rendering: initial;"
  >
<!--    <img style="position: absolute; left: 125%;" :src="'/assets/worldflipper/unit/full_resized/awakened/' + unit.extraction_id + '.png'"/>-->
    <div
        style="
        image-rendering: initial;
        display: flex;
        flex-wrap: wrap;
        padding: 16px;
        /*background-color: rgb(248,248,248, 0.85);*/
        border-radius: 16px;
        color: rgb(50,50,50);
      "
        :style="
      {
        background: (() => {
          let sty = 'linear-gradient(135deg, '
          sty += ele2color[getElementCss(armament['element'])] + ' 130px, rgba(248,248,248, 0.85) 130px,'
          sty += ' rgba(248,248,248, 0.85) calc(100% - 32px), rgba(40,0,115, 0.85) calc(100% - 32px), rgba(0,0,0, 0.85))'
          return sty
        })(),
        'box-shadow': '0 0 16px rgba(0,0,0,0.65)'
      }
      "
    >
      <div style="display: flex; width: 100%; margin: 16px 16px 0;">
        <ArmamentPicOrigin :armament="armament" :size="120" :soul="false"/>
        <div style="display: flex; width: 744px; justify-content: space-between;">
          <div style="padding: 8px 16px; font-size: 20px;">
<!--            <p style="font-size: 20px; font-family: '华文细黑', serif; font-weight: 600;">-->
<!--                　-->
<!--            </p>-->
            <p style="font-size: 34px; font-family: '华文细黑', serif; font-weight: 600;">
              {{ armament['name'][0] }}
            </p>
            <p style="font-size: 18px; font-family: '华文细黑', serif; margin-top: 2px;">
              {{ armament['name'][1] }}
            </p>
          </div>
          <div>
            <div style="display: flex; font-size: 16px; justify-content: space-evenly; flex-direction: row;">
              <div style="width: 165px;">
                <div class="span-f">
                  <div class="span-tag">HP</div>
<!--                  {{ armament['status_data'] }} <span style="color: crimson;">({{ armament['status']['mmhp'] }})</span>-->
                  {{ JSON.parse(armament['status_data'])[0] }}
                </div>
                <div class="span-f">
                  <div class="span-tag">ATK</div>
<!--                  {{ armament['status_data'] }} <span style="color: crimson;">({{ armament['status']['matk'] }})</span>-->
                  {{ JSON.parse(armament['status_data'])[1] }}
                </div>
              </div>
            </div>
            <!--          <div style="font-size: 16px;">-->
            <!--            获取方式：{{ unit['obtain'] }}-->
            <!--&lt;!&ndash;            {{ unit }}&ndash;&gt;-->
            <!--          </div>-->
          </div>
        </div>
      </div>
      <hr style="width: 100%; margin: 12px 12px 8px;"/>
      <div>
        <div style="display: flex; width: 100%; margin: 16px 16px 0;">
          <div class="span-title">
            能力
          </div>
          <div style="display: flex; flex-direction: column;">
<!--            <div class="span-ability" style="padding-bottom: 4px;">-->
<!--              <div style="margin: 0 8px; font-weight: 600; font-size: 22px;" v-html="format_content(armament['ability'])"/>-->
<!--            </div>-->
            <div class="span-ability" style="padding-bottom: 4px;">
              <!--          <div style="color: rgb(47, 195, 183); font-size: 20px;">❶</div>-->
              <div style="margin: 0 8px;" v-html="format_content(armament['ability'])"/>
            </div>
          </div>
        </div>
        <div style="display: flex; width: 100%; margin: 16px 16px 0;">
          <div class="span-title">
            魂珠
          </div>
          <div style="display: flex; flex-direction: column;">
            <div v-if="armament.hasOwnProperty('ability_soul') && armament['ability_soul']" class="span-ability">
              <div style="margin: 0 8px; opacity: 0.55;" v-html="format_content(armament['ability_soul'])"/>
            </div>
          </div>
        </div>
        <div style="display: flex; width: 100%; margin: 16px 16px 0;" v-if="armament['ability_awaken3'] || armament['ability_awaken5']">
          <div class="span-title">
            觉醒
          </div>
          <div style="display: flex; flex-direction: column;">
            <div class="span-ability" v-if="armament['ability_awaken3']">
              <div style="color: rgb(47, 195, 183); margin: 0 8px; font-size: 20px;">Lv3</div>
              <div style="margin: 0 8px;" v-html="format_content(armament['ability_awaken3'])"/>
            </div>
            <div class="span-ability" v-if="armament['ability_awaken5']">
              <div style="color: rgb(47, 195, 183); margin: 0 8px; font-size: 20px;">Lv5</div>
              <div style="margin: 0 8px;" v-html="format_content(armament['ability_awaken5'])"/>
            </div>
          </div>
        </div>
        <div style="display: flex; width: 100%; margin: 16px 16px 0;" v-if="armament['ability_augment1'] || armament['ability_augment70'] || armament['ability_augment100']">
          <div class="span-title">
            强化
          </div>
          <div style="display: flex; flex-direction: column;">
            <div class="span-ability" v-if="armament['ability_augment1']">
              <div style="color: rgb(195,52,47); margin: 0 8px; font-size: 20px;">Lv1</div>
              <div style="margin: 0 8px;" v-html="format_content(armament['ability_augment1'])"/>
            </div>
            <div class="span-ability" v-if="armament['ability_augment70']">
              <div style="color: rgb(195,52,47); margin: 0 8px; font-size: 20px;">Lv70</div>
              <div style="margin: 0 8px;" v-html="format_content(armament['ability_augment70'])"/>
            </div>
            <div class="span-ability" v-if="armament['ability_augment100']">
              <div style="color: rgb(195,52,47); margin: 0 8px; font-size: 20px;">Lv100</div>
              <div style="margin: 0 8px;" v-html="format_content(armament['ability_augment100'])"/>
            </div>
          </div>
        </div>
      </div>
      <hr style="width: 100%; margin: 12px 12px 8px;"/>
      <div style="padding: 16px; font-size: 16px;">
        {{ armament['description'] }}
      </div>
      <!--    <el-divider/>-->
    </div>
  </div>
</div>
</template>

<script>

// export default {
//   name: "UnitPicWikiCard",
//   data() {
//     return {
//       unit_data: unit_data
//     }
//   },
//   components: {UnitPicOrigin}
// }
</script>

<style scoped>
.span-f {
  margin: 16px 16px 16px 0;
}
.span-tag {
  float: left;
  padding: 0 4px;
  margin-right: 4px;
  width: 45px;
  /*background-color: darkgray;*/
  background: linear-gradient(247.5deg, transparent 8px, rgba(220,220,220) 8px, rgba(220,220,220));
}
.span-title {
  float: right;
  width: 75px;
  min-width: 75px;
  /*background: linear-gradient(90deg, black 2px, orange 2px, orange 6px, black 8px, black);*/
  height: fit-content;
  padding: 4px 8px;
  background: url(/assets/worldflipper/ui/black.png) no-repeat center;
  background-size: 70px;
  /*font-size: 14px;*/
  /*font-weight: 600;*/
  /*color: white;*/
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: lighter;
  /*font-family: 'pingfangR', serif;*/
  /*background: linear-gradient(247.5deg, transparent 8px, rgba(220,220,220) 8px, rgba(220,220,220));*/
}
.span-ability {
  display: flex;
  font-size: 20px;
  margin-left: 16px;
  padding-bottom: 16px;
}
</style>