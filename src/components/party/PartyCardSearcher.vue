<script setup>
import {ArrowDownBold, DocumentCopy} from '@element-plus/icons-vue'

const props = defineProps({
  party_release: Object
})
</script>

<template>
  <el-card class="party-card" body-style="padding: 12px 8px 8px;" style="margin: 8px; /* width: fit-content */ width: 498px;">
    <div style="display: flex; justify-content: space-between;">
      <div><span style="font-weight: bold; font-size: 18px;">{{ party_release.title }}</span><span style="color: darkgray;">({{ party_release.id }})</span></div>
      <div><span style="color: gray;">{{ party_release.updater_id }}</span></div>
    </div>
    <!--      <PartyCard :party="{party: p}"></PartyCard>-->
    <PartyCard :party="p"></PartyCard>
    <div style="display: flex; justify-content: space-between;" v-if="false">
      <div/>
      <div>
        <el-button-group style="margin: 0 2px;">
          <!--            <el-button size="default" style="color: deeppink; padding-right: 64px;">-->
          <el-button disabled size="small" style="color: deeppink;">
            <div style="width: 100%; height: 100%; position: absolute;"></div>
            <div>❤ 0</div>
          </el-button>
          <el-button disabled size="small">
            <el-icon><ArrowDownBold /></el-icon>
          </el-button>
        </el-button-group>
        <el-button size="small" type="warning" style="margin: 0 2px;">
          <el-icon><DocumentCopy /></el-icon>
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import PartyCard from "@/components/party/PartyCardEliya.vue";

export default {
  name: "PartyCardSearcher",
  components: {PartyCard}
}
</script>

<style scoped>

</style>