<script setup>
import PartyCard from "@/components/party/PartyCardEliya.vue";
import {ArrowDownBold, DocumentCopy} from "@element-plus/icons-vue";
import {PartyRelease} from "@/components/party_manager";

const props = defineProps({
  p: Object,
  // p: {
  //   default: new PartyRelease({}),
  //   type: PartyRelease,
  //   required: true
  // },
  extra_option: {
    default: true,
    type: Boolean,
    required: false
  }
})
</script>

<template>
  <el-card class="party-card" body-style="padding: 12px 8px 8px;" style="margin: 8px 4px; /* width: fit-content */ width: 498px;">
<!--    {{ p }}-->
    <div style="display: flex; justify-content: space-between;">
      <div><span style="font-weight: bold; font-size: 18px;">{{ p.title }}</span><span style="color: darkgray;">({{ p.id }})</span></div>
<!--      <div><span style="color: gray;"></span></div>-->
      <div>
        <el-popover
          placement="right"
        >
          <template #default>
            <a href="https://www.bilibili.com/video/BV1GJ411x7h7/" target="_blank">正在适配后端数据对接</a>
          </template>
          <template #reference>
            <el-alert show-icon type="warning" :closable="false" style="padding: 0 4px; height: 24px;">
              来源
            </el-alert>
          </template>
        </el-popover>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; margin: 4px 0;">
      <el-tag effect="dark" style="margin: 2px;" v-for="tag in p.tags">
        {{ tag }}
      </el-tag>
<!--      <el-tag effect="dark" style="margin: 2px;">-->
<!--        连击-->
<!--      </el-tag>-->
<!--      <el-tag effect="dark" type="warning" style="margin: 2px;">-->
<!--        水-->
<!--      </el-tag>-->
<!--      <el-tag effect="dark" type="success" style="margin: 2px;">-->
<!--        能力伤害-->
<!--      </el-tag>-->
<!--      <el-tag effect="dark" type="danger" style="margin: 2px;">-->
<!--        猫头鹰 初级 对策-->
<!--      </el-tag>-->
<!--      <el-tag effect="dark" type="danger" style="margin: 2px;">-->
<!--        废墟魔像 中级 对策-->
<!--      </el-tag>-->
<!--      <el-tag effect="dark" type="info" style="margin: 2px;">-->
<!--        若叶-->
<!--      </el-tag>-->
    </div>
    <el-divider style="margin: 4px 0;"></el-divider>
    <!--    <hr style="border-color: red;"/>-->
    <PartyCard :party="
    p"></PartyCard>
    <div v-if="extra_option" style="display: flex; justify-content: space-between;">
<!--      <el-popover-->
<!--          placement="bottom-start"-->
<!--          :width="240"-->
<!--      >-->
<!--        <template #default>-->
<!--          <span>abaabaabaaba</span>-->
<!--          <div>-->
<!--            这里是Description！（不过只有一条啦不会有其他人的评论之类的，但是记录会允许用户追加）-->
<!--          </div>-->
<!--        </template>-->
<!--        <template #reference>-->
<!--          <el-alert show-icon :closable="false" style="max-width: 160px; height: 24px;">-->
<!--            abaabaaaba……-->
<!--          </el-alert>-->
<!--        </template>-->
<!--      </el-popover>-->
      <div>
        <el-button size="small" type="primary" plain>
          提交来源
        </el-button>
      </div>
      <div>
        <el-button-group style="margin: 0 2px;">
          <!--            <el-button size="default" style="color: deeppink; padding-right: 64px;">-->

          <el-button disabled size="small" style="color: deeppink;">
            <div style="width: 100%; height: 100%; position: absolute;"></div>
            <div>❤ 0</div>
          </el-button>
          <el-button disabled size="small" type="primary" plain>
            添加记录
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

<style>
.el-alert .el-icon svg {
  height: 0.5em;
  width: 0.5em;
}
.el-alert .el-alert__description {
  margin: 5px 0;
}
</style>

<style scoped>

</style>