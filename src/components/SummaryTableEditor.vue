
<template>
  <el-form>
    <el-form-item label="一图ID">
      <el-select filterable v-model="table_id" @change="table_change">
        <el-option value="fire" style="padding: 0 0 0 20px;">
          <div style="background: linear-gradient(to right, transparent, orange)">
            超火
          </div>
        </el-option>
        <el-option value="re0" style="padding: 0 0 0 20px;">
          <div style="background: linear-gradient(to right, transparent, orange)">
            Re0
          </div>
        </el-option>
      </el-select>
    </el-form-item>
<!--    <input style="-->
<!--      background: var(&#45;&#45;main-color);-->
<!--      /*background-clip: text;*/-->
<!--      /*-webkit-text-fill-color: white;*/-->
<!--      /*-webkit-text-stroke: 16px;*/-->
<!--      -webkit-background-clip: text;-->
<!--      -webkit-text-fill-color: #fff;-->
<!--      -webkit-text-stroke:0.14em transparent;-->
<!--">-->
  </el-form>
  <div class="editor-body">
    <el-row :gutter="20" style="justify-content: center;">
      <el-col :span="24">
        <el-card class="sub-color-background">
          <el-form class="form" :model="table_data.property" label-width="80px">
            <el-form-item label="标题">
              <el-input size="large" v-model="table_data.property.title" placeholder="Default 一图流"/>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="0" style="width: 100%">
                <el-col :span="6">
                  <span class="el-form-item__label">主色</span>
                  <el-color-picker v-model="table_data.property.main_color"/>
                </el-col>
                <el-col :span="6">
                  <span class="el-form-item__label">副色</span>
                  <el-color-picker v-model="table_data.property.sub_color"/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-date-picker v-model="table_data.property.update_time" value-format="YYYY-MM-DD"/>
            </el-form-item>
            <el-form-item label="小关于">
              <el-input type="textarea" v-model="table_data.property.little_about"/>
            </el-form-item>
            <el-form-item label="Banner">
              <el-input placeholder="(css here)" v-model="table_data.property.banner"/>
            </el-form-item>
            <el-form-item label="Background">
              <el-input placeholder="(css here)" v-model="table_data.property.footer"/>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col v-for="(obj, index) in table_data.content" :span="24">
<!--        {{ index }}: {{ obj }}-->
        <el-card class="sub-color-background">
          <el-form>
            {{ index }}
            <el-form-item label="类型">
              <el-select v-model="obj.type" filterable>
                <el-option value="SubTitle"/>
                <el-option value="Row"/>
              </el-select>
            </el-form-item>
            <el-form-item v-if="obj.type === 'SubTitle'" label="属性">
              <el-select v-model="obj.data.element">
                <el-option label="无属性" value="none"/>
                <el-option label="火属性" value="fire"/>
                <el-option label="水属性" value="water"/>
                <el-option label="雷属性" value="thunder"/>
                <el-option label="风属性" value="wind"/>
                <el-option label="光属性" value="light"/>
                <el-option label="暗属性" value="dark"/>
              </el-select>
            </el-form-item>
            <el-form-item v-if="obj.type === 'SubTitle'" label="内容">
              <el-input v-model="obj.data.content"/>
            </el-form-item>
            <el-row v-if="obj.type === 'Row'" :gutter="8">
              <el-col v-for="(col, j) in obj.data.elements" :span="(() => {
                if(col.type === 'TextRegion' && col.data.full) {
                  return 24
                }else {
                  return 12
                }
              })()">
                <el-card body-style="padding: 12px 12px;">
                  {{ j }}
                  <el-form-item label="类型">
                    <el-select v-model="col.type" filterable @change="type_change([index, j], this)">
                      <el-option value="TextRegion"/>
                      <el-option value="Party"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="col.type === 'TextRegion'" label="内容">
                    <el-input type="textarea" :rows="4" v-model="col.data.content"/>
                  </el-form-item>
                  <PartyCard v-if="col.type === 'Party'" :party="col.data.party"/>
                  {{ col }}
                  <div style="display: flex; justify-content: space-between;">
                    <el-button type="danger" size="small"><el-icon><DeleteFilled /></el-icon></el-button>
                    <el-button-group>
                      <el-button size="small"><el-icon><ArrowLeft /></el-icon></el-button>
                      <el-button size="small"><el-icon><ArrowRight /></el-icon></el-button>
                    </el-button-group>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-form>
          <div style="display: flex; justify-content: space-between;">
            <el-button type="danger" size="small"><el-icon><DeleteFilled /></el-icon></el-button>
            <el-button-group>
              <el-button size="small"><el-icon><ArrowLeft /></el-icon></el-button>
              <el-button size="small"><el-icon><ArrowRight /></el-icon></el-button>
            </el-button-group>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" plain round style="width: 100%">
          <el-icon><Plus/></el-icon>
        </el-button>
      </el-col>
    </el-row>
    {{ JSON.stringify(table_data, null, 2) }}
<!--    <el-input v-model="table_data" disabled/>-->
  </div>
</template>

<script>
// import '@/assets/summary_table.css';
import {Plus, ArrowLeft, ArrowRight, DeleteFilled} from '@element-plus/icons-vue';
import {ref} from "vue";
import PartyCard from "@/components/calculator/PartyCardAnise.vue";
import axios from "axios";
// const table_data = ref({})
// const main_color = ref('#ffffff')
// const sub_color = ref('#000000')
// const table_data = ref({})
let table_data_ = {
  property: {
    title: 'Test thaaaaaaaat',
    update_time: '2022-12-23',
    main_color: '#000',
    sub_color: '#fff',
    little_about: '',
    banner: '',
    background: '',
    footer: '',
  },
  content: [
    {
      "type": "SubTitle",
      "data": {
        "content": "活动产出",
        "element": "water"
      }
    },
    {
      "type": "Row",
      "data": {
        "elements": [
          {
            "type": "TextRegion",
            "data": {
              "content": "🔸本次活动赠送的角色",
              "little_title": true
            }
          },
          {
            "type": "TextRegion",
            "data": {
              "content": "🔹本次活动产出的武器",
              "little_title": true
            }
          },
          {
            "type": "TextRegion",
            "data": {
              "content": [
                "[bigicon:u251] ★4 菜月昴",
                "承伤/棺材/技伤 棺材队的新承伤插件"
              ]
            }
          },
          {
            "type": "TextRegion",
            "data": {
              "content": [
                "[icon:a205]浑身水技伤 主C武器",
                "[icon:a206]浑身水技伤 辅助武器",
                "[icon:a207]暗棺材 辅助武器"
              ]
            }
          }
        ]
      }
    },
    {
      "type": "Row",
      "data": {
        "elements": [
          {
            "type": "TextRegion",
            "data": {
              "content": "满配雷姆主C x 1",
              "full": true,
              "little_title": true
            }
          },
          {
            "type": "Party",
            "data": {
              "party": {
                "union1":[249,149,195,198],"union2":[161,238,186,198],"union3":[127,58,198,198],
                "params": {"replacements": {"union1": {"main": [136]}}}
              }
            }
          },
          {
            "type": "TextRegion",
            "data": {
              "content": [
                "替换:",
                "雷狐狸[icon:u8] → 泡泡剑[icon:u159]",
                "[highlight]需要确保三人中至少有一个[end]",
                "雷狐狸[icon:u8]/泡泡剑[icon:u159]"
              ]
            }
          },
          {
            "type": "TextRegion",
            "data": {
              "content": "[novice]麻痹工具盘[end]",
              "little_title": true
            }
          },
          {
            "type": "TextRegion",
            "data": {
              "content": "[novice]顿足工具盘[end]",
              "little_title": true
            }
          },
          {
            "type": "Party",
            "data": {
              "party": {"union1":[171,102,0,0],"union2":[224,8,0,0],"union3":[41,127,0,0]}
            }
          },
          {
            "type": "Party",
            "data": {
              "party": {"union1":[171,159,0,0],"union2":[224,102,0,0],"union3":[41,127,0,0]}
            }
          },
          {
            "type": "TextRegion",
            "data": {
              "content": [
                "[highlight]麻痹顿足任选其一，泡泡剑[icon:u159]需要和猫头鹰[icon:u102]互换保证一动出手[end]",
                "已保证麻痹/顿足的情况下，将其换成火医生[icon:u54]即可"
              ],
              "full": true
            }
          },
          {
            "type": "TextRegion",
            "data": {
              "content": "",
              "little_title": true
            }
          },
          {
            "type": "TextRegion",
            "data": {
              "content": "(非满配)雷姆主C x 1",
              "little_title": true
            }
          },
          {
            "type": "TextRegion",
            "data": {
              "content": [
                "[highlight]非满配时，需要额外的参战刃[end]",
                "(比如纯子[icon:u211])",
                "替换:",
                "[icon:a158] → [icon:a186][icon:a206]"
              ]
            }
          },
          {
            "type": "Party",
            "data": {
              "party": {"union1":[249,149,195,205],"union2":[161,238,186,158],"union3":[127,58,158,158]}
            }
          },
          {
            "type": "TextRegion",
            "data": {
              "content": "工具盘参考",
              "full": true,
              "little_title": true
            }
          },
          {
            "type": "Party",
            "data": {
              "party": {"union1":[171,102,0,0],"union2":[224,8,0,0],"union3":[211,127,85,0]}
            }
          },
          {
            "type": "Party",
            "data": {
              "party": {"union1":[171,8,102,0],"union2":[102,211,93,0],"union3":[224,127,0,0]}
            }
          },
          {
            "type": "TextRegion",
            "invisible": true,
            "data": {
              "content": [
                "//TODO 确认 [icon:u8] → [icon:u159]",
                "猫头鹰转风书满充改充能书",
                "[icon:u8] x 2 及数值是否需要修正"
              ]
            }
          }
        ]
      }
    }
  ]
}

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

const table_id = ''
// table_data.main_color = '#fff'
// table_data.sub_color = '#000'
export default {
  name: "SummaryTable",
  data() {
    return{
      table_data: table_data_,
      // type_change: type_change,
      // table_change: table_change,
      table_id: table_id
    }
  },
  methods: {
    table_change(st_id){
      axios.get('api/summary_table/' + st_id + '/data').then(r => {
        this.table_data = r.data
      })
      console.log(st_id)
    },
    type_change(e, e1){
      console.log(this.table_data.content[e[0]]["data"]["elements"][e[1]])
      console.log(e1)
    }
  },
  components: {PartyCard, Plus, ArrowLeft, ArrowRight, DeleteFilled}
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
.editor-body:deep(div){
  margin: 2px 0;
}
.sub-color-background{
  background: v-bind('table_data.property.sub_color');
}
</style>
