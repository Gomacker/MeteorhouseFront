<script setup>

// import axios from "axios";
import {onMounted, ref} from "vue";
// import "@/assets/summary_table.css";


</script>
<template>
  <div id="st-body" v-if="Object.keys(table_data).length">
<!--    <div id="banner" style="background: green;" :style="() => {if (table_data.property.hasOwnProperty('background')) return {background: table_data.property.backkground}}">-->
    <div id="banner">
      <div :style="table_data.property.banner" style="width: 100%; height: 100%; position: absolute;">

      </div>
      <div id="banner-title">
        <p class="st-text" style="font-size: 62px;">{{ table_data.property.title }}</p>
      </div>
      {{ table_data.property.banner }}
      <div id="date">
        <p class="st-text">----/--/--</p>
      </div>
      <div id="about">
        <p class="st-text">aaa</p>
      </div>
    </div>
    <div v-for="row in table_data.content">
      <div v-if="row.type === 'SubTitle'" style="color: red;">
        {{ row }}
      </div>
      <div v-if="row.type === 'Row'" style="color: blue;">
        {{ row }}
      </div>
    </div>
  </div>
  <div>
    {{ $route.params['st_id'] }}
    {{ table_data }}
  </div>
</template>

<script>
// axios.get('api/summary_table/' + $route.params.st_id + '/data').then(r => {
//   table_data = r.data
// })
import axios from "axios";
import {ref} from "vue";

let table_data = ref({})
let colors = ref({
  main_color: 'rgba(255, 255, 255, 1)',
  sub_color: 'rgba(255, 255, 255, 1)',
})

export default {
  name: "SummaryTable",
  data() {
    return {
      table_data: table_data,
      colors: colors
    }
  },
  mounted() {
    console.log(this)
    axios.post('/api/summary_table/' + this.$route.params.st_id + '/data').then(r => {
      table_data.value = r.data
      console.log(r.data)
      colors.value.main_color = r.data.property['main_color']
      colors.value.sub_color = r.data.property['sub_color']
    })
  }
}
</script>

<style>
:root{
  --main-color: v-bind('colors.main_color');
  /*--main-color: rgb(96, 3, 14);*/
  --sub-color: v-bind('colors.sub_color');
  /*--sub-color: rgb(247, 99, 1);*/
  --little-about-color: rgba(96, 3, 14, 0.625);
}
#main-body{
  background-color: rgba(247, 99, 1, 0.5);
}
.sub-title{
  background-color: rgba(96, 3, 14, 0.75);
}
.wfo-optional {
  border: none;
}
.highlight {
  color: rgb(255 173 73);
}
.novice {
  color: rgb(88,255,183);
}
#st-body {
  width: 1036px;
  margin: 0 auto;
  font: 24px 黑体;
  line-height: normal;
  color: white;
  overflow: hidden;
  box-shadow: 0 0 128px v-bind('colors.main_color');
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
  /*background-color: var(--sub-color);*/
  background-color: v-bind('colors.sub_color');
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
  /*background: linear-gradient(to right, var(--sub-color), transparent);*/
  background: linear-gradient(to right, v-bind('colors.sub_color'), transparent);
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
.st-text {
  padding: 0.025em 0.075em;
  /*background: v-bind('colors.main_color');*/
  /*background: v-bind('colors.main_color');*/
  background: v-bind('colors.main_color');
  /*background-clip: text;*/
  /*-webkit-text-fill-color: white;*/
  /*-webkit-text-stroke: 16px;*/
  /*font-size: 62px;*/
  -webkit-background-clip: text;
  -webkit-text-fill-color: #fff;
  -webkit-text-stroke:0.14em transparent;
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