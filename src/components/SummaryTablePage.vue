<script setup>

// import axios from "axios";
import {onMounted, ref} from "vue";
import tab from "bootstrap/js/src/tab";
import SummaryTable from "@/components/SummaryTable.vue";
// import "@/assets/summary_table.css";


</script>
<template>
<!--  <div style="width: 100%; height: 100%;">-->
  <div>
<!--    <p>{{ $route.params['st_id'] }}</p>-->
<!--    <p>{{ table_data }}</p>-->
<!--    <el-scrollbar>-->

      <SummaryTable :table_data="table_data"/>
<!--    </el-scrollbar>-->

  </div>
</template>

<script>
// axios.get('api/summary_table/' + $route.params.st_id + '/data').then(r => {
//   table_data = r.data
// })
import axios from "axios";
import {ref} from "vue";

let table_data = ref({})
// let colors = ref({
//   main_color: 'rgba(255, 255, 255, 1)',
//   sub_color: 'rgba(255, 255, 255, 1)',
// })

export default {
  name: "SummaryTablePage",
  data() {
    return {
      table_data: table_data,
      // colors: colors
    }
  },
  mounted() {
    console.log(this)
    axios.post('/api/summary_table/' + this.$route.params.st_id + '/data').then(r => {
      table_data.value = r.data
      console.log(r.data)
      // colors.value.main_color = r.data.property['main_color']
      // colors.value.sub_color = r.data.property['sub_color']
    })
  }
}
</script>

<style>
</style>