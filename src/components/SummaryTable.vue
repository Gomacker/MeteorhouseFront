<script setup>

// import axios from "axios";
import {onMounted, ref} from "vue";


</script>
<template>
  <div id="st-body">
    <div id="banner">
      <div id="banner-title">
        <p class="st-text">废墟魔像 超级 踢罐配队</p>
        {{ $route.params['st_id'] }}
        {{ table_data }}
      </div>
    </div>
  </div>
</template>

<script>
// axios.get('api/summary_table/' + $route.params.st_id + '/data').then(r => {
//   table_data = r.data
// })
import axios from "axios";
import {ref} from "vue";

let table_data = ref({})

export default {
  name: "SummaryTable",
  data() {
    return {
      table_data: table_data
    }
  },
  mounted() {
    console.log(this)
    axios.post('/api/summary_table/' + this.$route.params.st_id + '/data').then(r => {
      table_data.value = r.data
    })
  }
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
.st-text{
  padding: 0.075em;
  background: var(--main-color);
  /*background-clip: text;*/
  /*-webkit-text-fill-color: white;*/
  /*-webkit-text-stroke: 16px;*/
  font-size: 62px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: #fff;
  -webkit-text-stroke:0.14em transparent;
}
</style>