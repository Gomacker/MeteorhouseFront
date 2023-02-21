<script setup>
import {ref} from "vue";
import axios from "axios";


const table_list = ref([])

axios.post(
    '/api/table_list/'
).then(r => {
      table_list.value = r.data['tables']
    }
)
</script>

<template>
  <div>
<!--    {{ table_list }}-->
    <div style="display: flex; flex-wrap: wrap;">
      <el-card class="table_card" v-for="tid in table_list" @click="$router.push('/summary_table/' + tid)">
        {{ tid }}
      </el-card>
    </div>
  </div>
<!--  <SummaryTable></SummaryTable>-->
</template>

<style scoped>
.table_card {
  width: fit-content;
  margin: 10px;
  cursor: pointer;
}
.table_card:hover {
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
  color: rgb(250, 138, 250);
}
</style>