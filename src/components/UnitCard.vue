<script setup>
import {Picture, CircleClose} from '@element-plus/icons-vue'
defineProps({
  id_: Number,
  unit: Object
})
</script>
<template>
<el-card style="width: fit-content;">
  <div>

    <el-image
        :src="'http://127.0.0.1:8000/static/worldflipper/unit/square212x/base/' + unit['WfExId'] + '.png'"
        style=""
        :title="id_ + ': ' + unit['WfExId']"
        loading="lazy"
        @dragstart.prevent
    >
      <div slot="placeholder">
        <el-icon><Picture/></el-icon>
      </div>
      <div slot="error">
        flp
        <el-icon><CircleClose /></el-icon>
      </div>
    </el-image>
  </div>
</el-card>
</template>

<script>

export default {
  name: "UnitCard"
}
</script>
<style scoped>

</style>