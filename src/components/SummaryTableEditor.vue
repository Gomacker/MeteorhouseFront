
<template>
  <div style="box-shadow: black 0 0 4px; position: fixed; top: 80px; width: 70%; padding: 16px; z-index: 20; background: white;">
    <el-form>
      <span><el-button @click="open_alert">注意事项</el-button></span>
      {{ table_data.hasOwnProperty('aa') }}
      <span v-if="loaded_table_id"> 预览页：<a :href="'/api/summary_table/' + loaded_table_id" target="_blank">/api/summary_table/{{ loaded_table_id }}</a></span>

      <el-form-item label="一图ID">
        <el-select filterable v-model="table_id">
<!--          <el-option value="fire" style="padding: 0 0 0 20px;">-->
<!--            <div style="background: linear-gradient(to right, transparent, orange)">-->
<!--              超火-->
<!--            </div>-->
<!--          </el-option>-->
          <el-option v-for="st in table_list" :value="st" @change="table_change"/>
        </el-select>
        &nbsp;&nbsp;
        <el-button type="default" @click="table_change(table_id)">读取</el-button>
      </el-form-item>
    </el-form>
    <div>
<!--      <el-button type="primary" @click="">新建</el-button>-->
      <el-button type="primary" @click="save_table" :disabled="!Boolean(loaded_table_id && table_data.hasOwnProperty('property'))">保存</el-button>
<!--      {{ loaded_table_id }}-->
<!--      {{ table_data.hasOwnProperty('property') }}-->
    </div>
  </div>
  <div style="margin-top: 180px;">
<!--    <SummaryTableEditorBodyTemp/>-->
    <SummaryTableEditorBody/>
  </div>
</template>

<script>
// import '@/assets/summary_table.css';
import {Plus, ArrowLeft, ArrowRight, DeleteFilled} from '@element-plus/icons-vue';
import {ref} from "vue";
import PartyCard from "@/components/party/PartyCardAnise.vue";
import axios from "axios";
import {save_table, loaded_table_id, table_data, table_change, type_change} from "@/components/summary_table_editor";
import SummaryTableEditorBody from "@/components/SummaryTableEditorBody.vue";
import {ElMessageBox} from "element-plus";
import SummaryTableEditorBodyTemp from "@/components/SummaryTableEditorBodyTemp.vue";
const table_id = ref('')
if (loaded_table_id && !table_id) {
  table_id.value = loaded_table_id.value
}

const table_list = ref([])

axios.post(
    '/api/table_list/'
).then(r => {
      table_list.value = r.data['tables']
    }
)

// table_data.main_color = '#fff'
// table_data.sub_color = '#000'
const save_quick = (event) => {
  if (event.keyCode === 83 && event.ctrlKey) {
    console.log('ctrl + s')
    event.preventDefault()
    event.returnValue = false
    save_table()
    if (event.ctrlKey && event.code === 'KeyS') return false
  }
}
export default {
  name: "SummaryTable",
  data() {
    return{
      table_list: table_list,
      table_data: table_data,
      table_id: table_id,
      loaded_table_id: loaded_table_id,
    }
  },
  methods: {
    axios,
    table_change,
    type_change,
    save_table,
    open_alert() {
      ElMessageBox.alert(
          '      <p style="color: deepskyblue;">输出方法: 在预览页链接后加上?no_header=1，然后按F12呼出DevTool，Ctrl+Shift+P呼出command，搜索screenshot，选择截取完整尺寸屏幕</p>\n' +
          '      <p style="color: deepskyblue;">tip: 最好把窗口宽度拉到小于一图流宽度，这样不用裁剪</p>\n' +
          '      <p>有关注之类的水印后处理自己整咯（</p>\n' +
          '      <p> 旧一图会有旧版本读取问题，可以把abs作参考</p>\n' +
          '      <p>背景和主题修改在群里@我（</p>',
          'aa',
          {dangerouslyUseHTMLString: true}
      )
    }
  },
  components: {SummaryTableEditorBodyTemp, SummaryTableEditorBody, PartyCard, Plus, ArrowLeft, ArrowRight, DeleteFilled},
  beforeRouteLeave() {
    // console.log('seuhioghouie')
  },
  mounted() {
    window.addEventListener('keydown', save_quick)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', save_quick)
  }
}
</script>

<style>
</style>

<style scoped>

:root{
  ---main-color-value: 96, 3, 14;
  ---sub-color-value: 247, 99, 1;
  --main-color: rgba(var(---main-color-value), 1);
  --sub-color: rgba(var(---sub-color-value), 1);
  --little-about-color: rgba(var(---main-color-value), 0.625);
}
</style>
