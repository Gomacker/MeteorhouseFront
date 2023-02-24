<script setup>

// import axios from "axios";
import {onMounted, onUnmounted, ref} from "vue";
import tab from "bootstrap/js/src/tab";
import SummaryTable from "@/components/SummaryTable.vue";
// import "@/assets/summary_table.css";


</script>
<template>
  <div>
      <SummaryTable :table_data="table_data" :hidden_replacements="hidden_replacements"/>

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
  name: "SummaryTablePage",
  data() {
    return {
      table_data: table_data,
      hidden_replacements: this.$route['query'].hidden_replacements ? this.$route['query'].hidden_replacements.toLowerCase() === 'true' : true
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
  },
  unmounted() {
    table_data.value = {}
  }
}
</script>

<style>
</style>