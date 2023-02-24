<script setup>

import {h, onBeforeUpdate, ref, render} from "vue";
import PartyCardEliya from "@/components/party/PartyCardEliya.vue";
import UnitPicOrigin from "@/components/party/components/UnitPicOrigin.vue";
import {unit_data} from "@/components/party_manager";
import SummaryTableTextContent from "@/components/summary_table/SummaryTableTextContent.vue";

function splitByBrackets(str) {
  let result = [];
  let bracketed = str.match(/\[.*?]/g) || [];
  let unbracketed = str.split(/\[.*?]/g);
  for (let i = 0; i < unbracketed.length; i++) {
    if (unbracketed[i]) result.push(unbracketed[i]);
    if (i < bracketed.length) result.push(bracketed[i]);
  }
  return result;
}


function transColor(color, s) {
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  if (rgbRegex.test(color)) {
    color = rgbToHex(color)
  }
  return color + s
}

function formatText(t) {
  // console.log(t)
  t = t.replaceAll('', '')
  // t = '<p>' + t + '</p>'
  t = t.replaceAll('\n', '</p><p>')
  t = t.replaceAll('[novice]', '<span class="novice">')
  t = t.replaceAll('[highlight]', '<span class="highlight">')
  t = t.replaceAll('[end]', '</span>')
  t = t.replaceAll('[biliicon]', '<img style="width: 24px; vertical-align: text-bottom; margin: 0 4px;" src="https://www.bilibili.com/favicon.ico" alt=""/>')

  return t
}

function rgbToHex(rgb) {
  let [r, g, b] = rgb.match(/\d+/g).map(x => parseInt(x));

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const props = defineProps({
  table_data: Object,
  hidden_replacements: {
    type: Boolean,
    required: false,
    default: true
  }
})
const colors = ref({
  main_color: 'rgba(255, 255, 255, 1)',
  sub_color: 'rgba(255, 255, 255, 1)',
})
onBeforeUpdate(() => {
  if (Object.keys(props.table_data).length) {
    colors.value.main_color = props.table_data.property['main_color']
    colors.value.sub_color = props.table_data.property['sub_color']
  }})
//
// colors.value = {
//   main_color: props.table_data.property.main_color,
//   sub_color: props.table_data.property.sub_color,
// }
// export default {
//   name: "SummaryTable",
//   data() {
//     return {
//       table_data: props.table_data,
//       colors: colors
//     }
//   }
// }
</script>
<template>
  <div
      id="st-body"
      v-if="Object.keys(table_data).length"
      :style="{
        '--main-color': table_data.property.main_color,
        '--sub-color': table_data.property.sub_color,
        '--sub-title-color': transColor(table_data.property.main_color, 'a5'),
        '--main-body-color': transColor(table_data.property.sub_color, '80'),
        '--little-about-color': transColor(table_data.property.main_color, 'a5'),
      }"
  >
<!--    <div id="banner" style="background: green;" :style="() => {if (table_data.property.hasOwnProperty('background')) return {background: table_data.property.backkground}}">-->
    <div id="banner">
      <div :style="table_data.property.banner" style="width: 100%; height: 100%; position: absolute;">

      </div>
      <div id="banner-title">
<!--        <p class="st-text" style="font-size: 62px;">{{ table_data.property.title }}</p>-->
        <SummaryTableTextContent class="st-text" style="font-size: 62px;" :content="table_data.property.title"></SummaryTableTextContent>
      </div>
      <div id="date">
<!--        <SummaryTableTextContent :content="table_data.property.update_time"/>-->
<!--        <p class="st-text" v-html="formatText(table_data.property.update_time)"></p>-->
        <SummaryTableTextContent class="st-text" :content="table_data.property.update_time"></SummaryTableTextContent>
      </div>
      <div id="about">
<!--        <div class="st-text" v-html="formatText(table_data.property.little_about)"></div>-->
<!--        {{ little_abouts = table_data.property.little_about.split('\n') }}-->
        <SummaryTableTextContent style="font-weight: 900;" class="st-text" :content="table_data.property.little_about.split('\n')[0]"></SummaryTableTextContent>
        <SummaryTableTextContent style="font-size: 22px;" class="st-text" :content="table_data.property.little_about.split('\n').slice(1).join('\n')"></SummaryTableTextContent>
<!--        <SummaryTableTextContent class="st-text" :content="little_abouts"></SummaryTableTextContent>-->
      </div>
    </div>
    <div :style="table_data.property.background">
      <div id="main-body">
        <div v-for="row in table_data.content">
          <!--      <div v-if="row.type === 'SubTitle'" style="color: red;">-->
          <div v-if="row.type === 'SubTitle'">
            <!--        {{ row }}-->
            <div class="sub-title">
              <p>
                <img class="title-ele-icon" :src="'/assets/worldflipper/icon/' + row.data['element'] + '.png'" alt=""/>{{ row.data['content'] }}
              </p>
            </div>
          </div>
          <div v-if="row.type === 'Row'" style="display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap;">
            <div v-for="ele in row.data.elements">
              <SummaryTableTextContent
                  v-if="ele.type === 'TextRegion' && ele.data['content']"
                  class="st-text"
                  style="margin: 8px; padding: 6px; width: 480px;"
                  :style="{
                    width: ele.data['full'] ? '988px' : '492px',
                    font: ele.data['little_title'] ? '32px 黑体' : '',
                    'font-weight': ele.data['little_title'] ? '900' : '',
                    'margin-bottom': ele.data['little_title'] ? '0' : '',
                    'padding-bottom': ele.data['little_title'] ? '0' : '',
                  }"
                  :content="ele.data['content']"
              />
              <div class="st-party">
                <PartyCardEliya :hidden_replacement="hidden_replacements" v-if="ele.type === 'Party'" style="margin: 8px;" :party="ele.data['party']"/>
              </div>
              <div v-if="ele.type === 'Origin'" v-html="ele.data.content"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer" v-html="formatText(table_data.property.footer)">
    </div>
  </div>
</template>

<script>
</script>
<style>
.wfo-optional {
  border: none;
}
.highlight {
  color: rgb(255 173 73) !important;
  -webkit-text-fill-color: rgb(255 173 73) !important;
  position: initial;
}
.novice {
  color: rgb(88,255,183) !important;
  -webkit-text-fill-color: rgb(88,255,183) !important;
  position: initial;
}
</style>
<style scoped>

.party {
  transition: box-shadow 0.2s linear;
  box-shadow: none;
}
.party:hover {
  box-shadow: 0 0 8px 0 black;
}

/*:root{*/
/*  --main-color: v-bind('colors.main_color');*/
/*  !*--main-color: rgb(96, 3, 14);*!*/
/*  --sub-color: v-bind('colors.sub_color');*/
/*  !*--sub-color: rgb(247, 99, 1);*!*/
/*  --little-about-color: v-bind('colors.sub_color');*/
/*}*/
/*#main-body{*/
/*  background-color: rgba(247, 99, 1, 0.5);*/
/*}*/
/*.sub-title{*/
/*  background-color: rgba(96, 3, 14, 0.75);*/
/*}*/
#footer:deep(p) {
  margin-bottom: 10px;
}
#st-body {
  width: 1036px;
  /*margin: 0 auto;*/
  font: 24px 黑体;
  line-height: normal;
  color: white;
  overflow: hidden;
  /*box-shadow: 0 0 1px v-bind('colors.main_color');*/
  box-shadow: 0 0 1px var(--main-color);
}
#banner{
  position: relative;
  height: 570px;
}
#banner-title{
  font-weight: bold;
  text-align: center;
  font-size: 62px;
  padding: 12px;
  background-color: var(--sub-color);
  /*background-color: v-bind('colors.sub_color');*/
  box-shadow: 0 0 8px black;
}
#date{
  position: absolute;
  font-weight: bold;
  height: auto;
  left: 0;
  bottom: 0;
  font-size: 36px;
  padding: 4px 12px;
  background: linear-gradient(to right, var(--sub-color), transparent);
  /*background: linear-gradient(to right, v-bind('colors.sub_color'), transparent);*/
}
#about{
  position:absolute;
  right: 0;
  bottom: 0;
  font-size: 36px;
  padding: 12px;
  background-color: var(--little-about-color);
}
#about p{
  font-weight: bold;
  margin-bottom: 0;
}
#main-body {
  display: flex;
  flex-direction: column;
  image-rendering: auto;
  background-color: var(--main-body-color);
}
.st-text {
  padding: 0 0.075em;

  background: var(--main-color);
  -webkit-background-clip: text;
  -webkit-text-fill-color: #fff;
  -webkit-text-stroke:0.14em transparent;
}
.st-text:deep(div), .st-text:deep(span), .st-text:deep(p), .st-text:deep(b) {
  /*padding: 0.025em 0.075em;*/
  padding: 0 0.075em;

  /*background: v-bind('colors.main_color');*/
  /*background: v-bind('colors.main_color');*/
  /*background: v-bind('colors.main_color');*/
  background: var(--main-color);
  /*background-clip: text;*/
  /*-webkit-text-fill-color: white;*/
  /*-webkit-text-stroke: 16px;*/
  /*font-size: 62px;*/
  -webkit-background-clip: text;
  -webkit-text-fill-color: #fff;
  -webkit-text-stroke:0.14em transparent;
  /*margin-bottom: 8px;*/
}
.sub-title {
  box-shadow: black 0 0 8px;
  font: bold 42px 黑体;
  padding: 8px 24px;
  background-color: var(--sub-title-color);
}
.title-ele-icon {
  margin: -10px 8px 0;
  /*margin: 0 8px;*/
  vertical-align: middle;
  width: 36px;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, .8));
  -webkit-filter: drop-shadow(0 0 4px rgba(0, 0, 0, .8));
}
</style>

<!--<style scoped>-->
<!--.st-text{-->
<!--  /*padding: 0.075em;*/-->
<!--  background: v-bind('colors.main_color');-->
<!--  /*background-clip: text;*/-->
<!--  /*-webkit-text-fill-color: white;*/-->
<!--  /*-webkit-text-stroke: 16px;*/-->
<!--  font-size: 62px;-->
<!--  -webkit-background-clip: text;-->
<!--  -webkit-text-fill-color: #fff;-->
<!--  -webkit-text-stroke:0.14em transparent;-->
<!--}-->
<!--</style>-->