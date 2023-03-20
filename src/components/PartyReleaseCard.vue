<script setup>
import PartyCard from "@/components/party/PartyCardEliya.vue";
import {ArrowDownBold, DocumentCopy} from "@element-plus/icons-vue";
import {PartyRelease} from "@/components/party_manager";
import ClipboardA from "clipboard";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import axios from "axios";

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
function copy_party(id_) {
  const cb = new ClipboardA('#copy-' + id_)
  cb.on('success', e => {
    ElMessage.success('复制成功')
    cb.destroy()
  })
}
function show_ensure() {
  submit_url.value = '';
  show_dialog.value = true;
  // ElMessage.success('添加成功')

}
const show_dialog = ref(false)
const submit_url = ref('')
const url_formats = [
    /(?=https:\/\/)?ecrire-bot\.herokuapp\.com\/\S+(?=\/\?)?/,
    /(?=https:\/\/)?twitter\.com\/\S+\/status\/\S+(?=\/\?)?/,
    /(?=https:\/\/)?wasuku\.gamewiki\.jp\/\S+\/\S+(?=\/\?)?/,

    /(?=https:\/\/)?t\.bilibili\.com\/\S+(?=\/\?)?/,
    /(?=https:\/\/)?www\.bilibili\.com\/opus\/\S+(?=\/\?)?/,
    /(?=https:\/\/)?www\.bilibili\.com\/video\/BV\S+(?=\/\?)?/,
    /(?=https:\/\/)?www\.bilibili\.com\/read\/cv\S+(?=\/\?)?/,
    /(?=https:\/\/)?wiki\.biligame\.com\/worldflipper\/\S+(?=\/\?)?/,
    /(?=https:\/\/)?nga\.178\.com\/read\.php\?tid=\S+(?=\/\?)?/,
    /(?=https:\/\/)?bbs\.nga\.cn\/read\.php\?tid=\S+(?=\/\?)?/,
    /(?=https:\/\/)?tieba\.baidu\.com\/p\/\S+(?=\/\?)?/,
    /(?=https:\/\/)?www\.gamer\.cn\/sjtswy\/article\/\S+(?=\/\?)?/
]
function submit_source() {
  const transable = () => {
    const temp = function(s) {
      return s.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    const s = temp(submit_url.value)
    for (const pattern of url_formats) {
      const t = pattern.exec(s)
      if (t) {
        // console.log(t)
        return t
      }
    }
    return null
  }
  if (transable()) {
    axios.post(
        '/api/update_origin/',
        {
          party_id: props.p.id,
          url: submit_url.value
        }
    ).then(r => {
      ElMessage.success('提交成功[等待审核]')
      show_dialog.value = false
    }).catch(() => {
      ElMessage.error('提交失败[ServerErr]')
    })
  }else {
    ElMessage.error('提交失败[来源格式不支持]')
  }
}
</script>

<template>
  <el-card class="party-card" body-style="padding: 12px 8px 8px;" style="margin: 8px 4px; min-width: 498px; width: 498px; height: fit-content;">
<!--    {{ p }}-->
    <div style="display: flex; justify-content: space-between;">
      <div><span style="font-weight: bold; font-size: 18px;">{{ p.title }}</span><span style="color: darkgray;">({{ p.id }})</span></div>
<!--      <div><span style="color: gray;"></span></div>-->
      <div>
        <el-popover
          placement="right"
        >
          <template #default>
            <p>Oops...</p>
            <p>还没有来源记录</p>
            <p style="color: lightgrey;">上传id: {{ p.updater_id }}</p>
          </template>
          <template #reference>
            <el-alert show-icon type="warning" :closable="false" style="padding: 0 4px; height: 24px; width: 76px; min-width: 76px;">
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
        <el-button size="small" type="primary" @click="show_ensure" plain>
          提交来源
        </el-button>
        <el-dialog v-model="show_dialog" title="提交来源">
          <el-form-item label="链接">
            <el-input v-model="submit_url" @keydown.enter="submit_source"></el-input>
          </el-form-item>
          <div style="display: flex; flex-direction: row-reverse;">
            <el-button type="primary" @click="submit_source">
              提交
            </el-button>
          </div>
        </el-dialog>
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
        <el-button size="small" type="warning" :data-clipboard-text="JSON.stringify({party: p.party, params: p.params})" :id="'copy-' + p.id" @click="copy_party(p.id)" style="margin: 0 2px;">
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