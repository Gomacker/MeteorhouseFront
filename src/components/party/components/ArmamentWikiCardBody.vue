<script setup>
import UnitPicOrigin from "@/components/party/components/UnitPicOrigin.vue";
import {getElementCss, format_content} from "@/components/party_manager";
import {show_awakened} from "@/components/party/components/settings";
import ArmamentPicOrigin from "@/components/party/components/ArmamentPicOrigin.vue";
// import {unit_data} from "@/components/party_manager";

const alpha = 0.85;
const ele2color = {
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
    :style="{
    background: 'url(/assets/worldflipper/unit/full_resized/awakened/' + armament.extraction_id + '.png) no-repeat',
    // 'background-position': '130% 50%'
    }"
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
        // background: 'linear-gradient(135deg, ' + ele2color[getElementCss(unit['element'])] + ' 131px, rgba(248,248,248, 0.85) 131px, rgba(248,248,248, 0.85) calc(100% - 32px), rgba(40,0,115, 0.85) calc(100% - 32px), rgba(0,0,0, 0.85))',
        'box-shadow': '0 0 16px rgba(0,0,0,0.65)'
      }
      "
    >
      <div style="display: flex; width: 100%; margin: 16px 16px 0;">
        <div style="position: absolute; z-index: 1;">
          <!--        <img-->
          <el-image
              style="
              width: 200%;
              height: 200%;
              image-rendering: pixelated;
              left: calc(120px - 120%);
              top: calc(75px);
            "
              :src="'/assets/worldflipper/unit/pixelart/walk_front/' + armament['extraction_id'] + '.gif'"
              alt=""
          />
        </div>
        <ArmamentPicOrigin :armament="armament" :size="120" :soul="false"/>
        <div style="display: flex; width: 744px; justify-content: space-between;">
          <div style="padding: 8px 16px; font-size: 20px;">
            <p style="font-size: 20px; font-family: '华文细黑', serif; font-weight: 600;">
                　
            </p>
            <p style="font-size: 34px; font-family: '华文细黑', serif; font-weight: 600;">

              {{ armament['name'] }}
            </p>
<!--            <p style="font-size: 18px; font-family: '华文细黑', serif; margin-top: 2px;">-->
<!--              {{ armament['name'][2] }}-->
<!--            </p>-->
          </div>
          <div>
            <div style="display: flex; font-size: 16px; justify-content: space-evenly; flex-direction: row;">
              <div style="width: 165px;">
                <div class="span-f">
                  <div class="span-tag">HP</div>
<!--                  {{ armament['status_data'] }} <span style="color: crimson;">({{ armament['status']['mmhp'] }})</span>-->
                </div>
                <div class="span-f">
                  <div class="span-tag">ATK</div>
<!--                  {{ armament['status_data'] }} <span style="color: crimson;">({{ armament['status']['matk'] }})</span>-->
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
            队长
          </div>
          <div style="display: flex; flex-direction: column;">
<!--            <div class="span-ability" style="padding-bottom: 4px;">-->
<!--              <div style="margin: 0 8px; font-weight: 600; font-size: 22px;" v-html="format_content(armament['leader_ability_name'])"/>-->
<!--            </div>-->
<!--            <div class="span-ability" style="padding-bottom: 4px;">-->
<!--              &lt;!&ndash;          <div style="color: rgb(47, 195, 183); font-size: 20px;">❶</div>&ndash;&gt;-->
<!--              <div style="margin: 0 8px;" v-html="format_content(armament['leader_ability'])"/>-->
<!--            </div>-->
          </div>
        </div>
        <div style="display: flex; width: 100%; margin: 16px 16px 0;">
          <div class="span-title">
            技能
          </div>
          <div style="display: flex; flex-direction: column;">
<!--            <div class="span-ability" style="padding-bottom: 4px;">-->
<!--              <div style="margin: 0 8px; font-weight: 600; font-size: 22px;" v-html="format_content(armament['skill_name'])"/>-->
<!--            </div>-->
<!--            <div class="span-ability" style="padding-bottom: 4px;">-->
<!--              <div style="margin: 0 8px;" v-html="format_content(armament['skill_description'])"/>-->
<!--            </div>-->
<!--            <div class="span-ability" style="padding-bottom: 4px;">-->
<!--              <div style="margin: 0 8px;">-->
<!--                技能能量：{{ armament['skill_weight'] }}-->
<!--              </div>-->
<!--            </div>-->
          </div>
        </div>
        <div style="display: flex; width: 100%; margin: 16px 16px 0;">
          <div class="span-title">
            能力
          </div>
          <div style="display: flex; flex-direction: column;">
<!--            <div class="span-ability">-->
<!--              <div style="color: rgb(47, 195, 183); font-size: 20px;">❶</div>-->
<!--              <div style="margin: 0 8px;" v-html="format_content(armament['ability1'])"/>-->
<!--            </div>-->
<!--            <div class="span-ability">-->
<!--              <div style="color: rgb(47, 195, 183); font-size: 20px;">❷</div>-->
<!--              <div style="margin: 0 8px;" v-html="format_content(armament['ability2'])"/>-->
<!--            </div>-->
<!--            <div class="span-ability">-->
<!--              <div style="color: rgb(47, 195, 183); font-size: 20px;">❸</div>-->
<!--              <div v-if="armament['ability3']" style="margin: 0 8px;" v-html="format_content(armament['ability3'])"/>-->
<!--              <div v-else style="margin: 0 8px;">&#45;&#45;</div>-->
<!--            </div>-->
<!--            <div v-if="armament.hasOwnProperty('ability4') && armament['ability4']" class="span-ability">-->
<!--              <div style="color: rgb(47, 195, 183); font-size: 20px;">❹</div>-->
<!--              <div style="margin: 0 8px; opacity: 0.55;" v-html="format_content(armament['ability4'])"/>-->
<!--            </div>-->
<!--            <div v-if="armament.hasOwnProperty('ability5') && armament['ability5']" class="span-ability">-->
<!--              <div style="color: rgb(47, 195, 183); font-size: 20px;">❺</div>-->
<!--              <div style="margin: 0 8px; opacity: 0.55;" v-html="format_content(armament['ability5'])"/>-->
<!--            </div>-->
<!--            <div v-if="armament.hasOwnProperty('ability6') && armament['ability6']" class="span-ability">-->
<!--              <div style="color: rgb(47, 195, 183); font-size: 20px;">❻</div>-->
<!--              <div style="margin: 0 8px; opacity: 0.55;" v-html="format_content(armament['ability6'])"/>-->
<!--            </div>-->
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