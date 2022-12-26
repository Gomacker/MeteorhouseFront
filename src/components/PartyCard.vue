<script setup>
defineProps({
  party: Object
})
</script>
<template>
  <el-card>
    {{ party }}
  </el-card>
</template>

<script>
export default {
  name: "PartyCard"
}
</script>

<style scoped>

</style>