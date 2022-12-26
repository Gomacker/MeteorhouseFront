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
    <el-card></el-card>
    <el-card></el-card>
    <el-card></el-card>
    <el-card></el-card>
    <el-card></el-card>
    <el-card></el-card>
    <HelloWorld :msg="name"></HelloWorld>
  </div>
<!--  <SummaryTable></SummaryTable>-->
</template>

<style scoped>
</style>