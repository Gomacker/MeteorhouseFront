<template>
  <div id="st-body">
    <div id="banner">
      <div id="banner-title">
        <p class="text_t">废墟魔像 超级 踢罐配队</p>
      </div>
    </div>
  </div>
</template>

<script>
// import '@/assets/summary_table.css';
export default {
  name: "SummaryTable"
}
</script>

<style>
:root{
  --main-color: rgb(96, 3, 14);
  --sub-color: rgb(247, 99, 1);
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
</style>

<style scoped>
.text_t{
  background: var(--main-color);
  /*background-clip: text;*/
  /*-webkit-text-fill-color: white;*/
  /*-webkit-text-stroke: 16px;*/
  -webkit-background-clip: text;
  -webkit-text-fill-color: #fff;
  -webkit-text-stroke:0.14em transparent;
}
</style>