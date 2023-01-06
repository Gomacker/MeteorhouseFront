
<template>
  <div style="box-shadow: black 0 0 4px; position: fixed; top: 80px; width: 70%; padding: 16px; z-index: 20; background: white;">
    <el-form>
      {{ table_id }}
      {{ loaded_table_id }}
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
      <el-button type="primary" @click="">新建</el-button>
      <el-button type="primary" @click="save_table">保存</el-button>
    </div>
  </div>
  <div style="margin-top: 140px;">
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
// const table_data = ref({})
// const main_color = ref('#ffffff')
// const sub_color = ref('#000000')
// const table_data = ref({})
// let table_data_ = ref({})

// function table_change(st_id){
//   axios.get('api/summary_table/' + st_id + '/data').then(r => {
//     this.table_data = r.data
//   })
//   console.log(st_id)
// }
//
// function type_change(e, e1){
//   console.log(this.table_data.content[e[0]]["data"]["elements"][e[1]])
//   console.log(e1)
// }
const table_id = ref('')
if (loaded_table_id && !table_id) {
  table_id.value = loaded_table_id.value
}

const table_list = ref([])

axios.get(
    '/api/summary_table_list/'
).then(r => {
      table_list.value = r.data['tables']
    }
)

// table_data.main_color = '#fff'
// table_data.sub_color = '#000'
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
    save_table
  },
  components: {SummaryTableEditorBody, PartyCard, Plus, ArrowLeft, ArrowRight, DeleteFilled},
  beforeRouteLeave() {
    // console.log('seuhioghouie')
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
