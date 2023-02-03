<script>
import HelloWorld from "./HelloWorld.vue";
import SummaryTable from "@/components/SummaryTable.vue";
name = "SummaryTable"
export default {
  data(){
    return {
      name: name
    }
  },
  components: {SummaryTable, HelloWorld}
}
</script>

<template>
  <div>
    <router-link to="/summary_table/default">
      Default
    </router-link>
    <el-card></el-card>
    <el-card></el-card>
    <el-card></el-card>
    <el-card></el-card>
    <el-card></el-card>
    <el-card></el-card>
  </div>
<!--  <SummaryTable></SummaryTable>-->
</template>

<style scoped>
</style>