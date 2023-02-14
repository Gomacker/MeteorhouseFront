<script setup>
import {getElementCss, getUnitPicUrl, unit_data} from '@/components/party_manager'
import UnitPicOrigin from "@/components/party/components/UnitPicOrigin.vue";
import {reactive, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const ele2color = {
  'fire': 'rgba(234,53,75)',
  'water': 'rgb(68,137,255)',
  'thunder': 'rgb(244,204,36)',
  'wind': 'rgb(119,217,47)',
  'light': 'rgb(245,255,186)',
  'dark': 'rgb(90,57,95)',
}

const selected_obj_id = ref(0)
const default_from = {
  wf_id: '',
  anise_id: '',
  extraction_id: '',
  legacy_id: '',
  name: ['','',''],
  rarity: 0,
  element: undefined,
  pf_type: undefined,
  race: ''
}
let form = reactive({data: JSON.parse(JSON.stringify(default_from))})
const loaded_source_ids = ref([])
const selected_source = ref('')
const loaded_source = ref('')
const loaded_unit_data = ref({})
function load_source_data() {
  axios.post(
      '/api/load_source/' + selected_source.value + '/unit/',
  ).then(r => {
    if (r.data['result'] === 'success') {
      loaded_source.value = selected_source.value
      loaded_unit_data.value = r.data['data']
      selected_obj_id.value = 0
      form.data = JSON.parse(JSON.stringify(default_from))
      ElMessage.success('加载成功')
    }else {
      ElMessage.error('加载失败')
    }
  }).catch(() => {
        ElMessage.error('获取角色数据失败')
      }
  )
}
function save_unit() {
  // const data = Object.([selected_obj_id.value, loaded_unit_data.value])
  // id_ = selected_obj_id.value
  axios.post(
      '/api/update_source/' + loaded_source.value + '/unit/',
      {
        data: {
          [selected_obj_id.value]: form.data
        }
      }
  ).then(r => {
    if (r.data['result'] === 'success') {
      // loaded_source.value = selected_source.value
      // loaded_unit_data.value = r.data['data']
      // form.data = JSON.parse(JSON.stringify(default_from))
      ElMessage.success('保存成功')
    }else {
      ElMessage.error('保存失败')
    }
  }).catch(() => {
        ElMessage.error('保存失败（连接失败）')
      }
  )
}
axios.post(
    '/api/get_loaded_source_ids/',
).then(r => {
  loaded_source_ids.value = r.data['sources']
}).catch(() => {
      ElMessage.error('获取源列表失败')
    }
)
const fold_units = ref(false)
// const icon_size = ref(240);
</script>
<template>
  <div
      style="
        display: flex;
        flex-direction: column;
        height: 100%;
      "
  >
<!--    <el-row v-for="unit in unit_data" style="border: red solid 1px; width: 360px;">-->
<!--    <img v-for="unit in unit_data" class="unit-pic" :src="getUnitPicUrl(unit)" alt=""/>-->
<!--    <el-slider v-model="icon_size" :min="48" :max="240"/>-->
    <el-card
        :style="{'--element-color': ele2color[getElementCss(form.data['element'])]}"
        style="
          /*height: fit-content;*/
          width: fit-content;
          display: flex;
          /*flex-direction: column;*/
          border-radius: 16px;
          height: calc(100% - 24px);
          /*height: 100%;*/
          box-shadow: 0 0 16px var(--element-color);
        "
    >
      <div>
        <div style="display: flex;">
          <el-select v-model="selected_source">
            <el-option v-for="source in loaded_source_ids" :value="source">
            </el-option>
          </el-select>
          <el-button :disabled="!Boolean(selected_source)" @click="load_source_data">读取</el-button>
        </div>
        <el-divider/>
      </div>
      <div v-if="loaded_source">
        <div style="display: flex;">

          <UnitPicOrigin
              :unit="form.data"
              :size="82"
          />
          &nbsp;
          <el-button type="primary" :disabled="!Boolean(selected_obj_id)" @click="save_unit">保存</el-button>
        </div>
        <el-form :inline="true">
          <div style="display: flex; flex-direction: row;">
            <el-form-item label="ANISE ID">
              {{ form.data.anise_id }}
            </el-form-item>
            <el-form-item label="WORLDFLIPPER ID">
              {{ form.data.wf_id }}
            </el-form-item>
            <el-form-item label="LEGACY ID">
              {{ form.data.legacy_id }}
            </el-form-item>
            <el-form-item label="EXTRACTION ID">
              {{ form.data.extraction_id }}
<!--              <el-input v-model="form.data.extraction_id"/>-->
            </el-form-item>
          </div>
        </el-form>
      </div>
      <el-scrollbar v-if="loaded_source" always height="calc(100% - 132px)" style="padding-right: 16px;">
        <el-form :inline="true">
          <div style="display: flex; flex-direction: row;">
            <el-form-item label="中文名">
              <el-input v-model="form.data.name[0]"/>
            </el-form-item>
            <el-form-item label="称号名">
              <el-input v-model="form.data.name[1]"/>
            </el-form-item>
            <el-form-item label="日文名">
              <el-input v-model="form.data.name[2]"/>
            </el-form-item>
          </div>
          <div style="display: flex; flex-direction: row;">
            <el-form-item label="稀有度">
              <el-select v-model="form.data.rarity">
                <el-option :value="0">
                  None
                  <!--                <img :src="'/assets/worldflipper/ui/star/star' + form.rarity + '.png'" alt=""/>-->
                </el-option>
                <el-option :value="1" style="display: flex; align-items: center;">
                  <img style="height: 24px;" :src="'/assets/worldflipper/ui/star/star1.png'" alt=""/>
                </el-option>
                <el-option :value="2" style="display: flex; align-items: center;">
                  <img style="height: 24px;" :src="'/assets/worldflipper/ui/star/star2.png'" alt=""/>
                </el-option>
                <el-option :value="3" style="display: flex; align-items: center;">
                  <img style="height: 24px;" :src="'/assets/worldflipper/ui/star/star3.png'" alt=""/>
                </el-option>
                <el-option :value="4" style="display: flex; align-items: center;">
                  <img style="height: 24px;" :src="'/assets/worldflipper/ui/star/star4.png'" alt=""/>
                </el-option>
                <el-option :value="5" style="display: flex; align-items: center;">
                  <img style="height: 24px;" :src="'/assets/worldflipper/ui/star/star5.png'" alt=""/>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="属性">
              <el-select v-model="form.data.element">
                <el-option :value="-1" label="无属性">
                  <img style="width: 20px; height: 20px; vertical-align: sub;" :src="'/assets/worldflipper/icon/none.png'" alt=""/>
                  无属性
                </el-option>
                <el-option :value="0" label="火属性">
                  <img style="width: 20px; height: 20px; vertical-align: sub;" :src="'/assets/worldflipper/icon/fire.png'" alt=""/>
                  火属性
                </el-option>
                <el-option :value="1" label="水属性">
                  <img style="width: 20px; height: 20px; vertical-align: sub;" :src="'/assets/worldflipper/icon/water.png'" alt=""/>
                  水属性
                </el-option>
                <el-option :value="2" label="雷属性">
                  <img style="width: 20px; height: 20px; vertical-align: sub;" :src="'/assets/worldflipper/icon/thunder.png'" alt=""/>
                  雷属性
                </el-option>
                <el-option :value="3" label="风属性">
                  <img style="width: 20px; height: 20px; vertical-align: sub;" :src="'/assets/worldflipper/icon/wind.png'" alt=""/>
                  风属性
                </el-option>
                <el-option :value="4" label="光属性">
                  <img style="width: 20px; height: 20px; vertical-align: sub;" :src="'/assets/worldflipper/icon/light.png'" alt=""/>
                  光属性
                </el-option>
                <el-option :value="5" label="暗属性">
                  <img style="width: 20px; height: 20px; vertical-align: sub;" :src="'/assets/worldflipper/icon/dark.png'" alt=""/>
                  暗属性
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="PF类型">
              <el-select v-model="form.data.pf_type">
                <el-option :value="0" label="剑士"/>
                <el-option :value="1" label="格斗"/>
                <el-option :value="2" label="射击"/>
                <el-option :value="3" label="辅助"/>
                <el-option :value="4" label="特殊"/>
              </el-select>
            </el-form-item>
            <el-form-item label="种族">
              <!--            <el-input  v-model="form.race"></el-input>-->
              <el-select
                  multiple
                  :model-value="(() => {
                const l = form.data.race.split(',');
                if (l[0] === '') l.splice(0, 1)
                return l
              })()"
                  @update:model-value="v => {form.data.race = v.join(',')}"
              >
                <el-option :value="'Human'" label="人"/>
                <el-option :value="'Beast'" label="兽"/>
                <el-option :value="'Element'" label="精灵"/>
                <el-option :value="'Machine'" label="机械"/>
                <el-option :value="'Dragon'" label="龙"/>
                <el-option :value="'Mystery'" label="妖"/>
                <el-option :value="'Undead'" label="不死"/>
                <el-option :value="'Aquatic'" label="水栖"/>
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex; flex-direction: row;">
            <el-form-item label="性别">
              <el-input disabled v-model="form.data.gender"/>
            </el-form-item>
            <el-form-item label="职责">
              <el-input disabled v-model="form.data.stance"/>
            </el-form-item>
            <el-form-item label="CV">
              <el-input v-model="form.data.cv"/>
            </el-form-item>
          </div>
          <div style="display: flex; flex-direction: row;">
            <el-form-item label="白值数据">
              <el-input disabled v-model="form.data.status_data" style="width: 600px;"/>
            </el-form-item>
          </div>
          <div style="display: flex; flex-direction: row;">
            <el-form-item label="技能名">
              <el-input v-model="form.data.skill_name"/>
            </el-form-item>
            <el-form-item label="技能能量">
              <el-input-number v-model="form.data.skill_weight"/>
            </el-form-item>
          </div>
        </el-form>
        <el-form>
          <el-form-item label="技能描述">
            <el-input
                type="textarea"
                style="font-family: Consolas, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;"
                rows="4"
                v-model="form.data.skill_description"
            />
          </el-form-item>
        </el-form>
        <el-form
            style="
              font-family: Consolas, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              background-color: darkgray;
              padding: 4px;
            "
        >
          * 以下数据在能力描述生成器后会做二次校对整理
          <el-form-item label="队长能力">
            <el-input type="textarea" rows="2" v-model="form.data.leader_ability"/>
          </el-form-item>
          <el-form-item label="能力1">
            <el-input type="textarea" rows="2" v-model="form.data.ability1"/>
          </el-form-item>
          <el-form-item label="能力2">
            <el-input type="textarea" rows="2" v-model="form.data.ability2"/>
          </el-form-item>
          <el-form-item label="能力3">
            <el-input type="textarea" rows="2" v-model="form.data.ability3"/>
          </el-form-item>
          <el-form-item label="能力4">
            <el-input type="textarea" rows="2" v-model="form.data.ability4"/>
          </el-form-item>
          <el-form-item label="能力5">
            <el-input type="textarea" rows="2" v-model="form.data.ability5"/>
          </el-form-item>
          <el-form-item label="能力6">
            <el-input type="textarea" rows="2" v-model="form.data.ability6"/>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="描述">
            <el-input type="textarea" rows="2" v-model="form.data.description"/>
          </el-form-item>
          <el-form-item label="获取">
            <el-input disabled v-model="form.data.obtain"/>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-card>
    {{ selected_obj_id }}
<!--    {{ form }}-->
<!--    {{ form }}-->
<!--    {{ form }}-->
  </div>
  <el-button
      style="
        position: absolute;
        right: 0;
         transition: bottom 0.4s;
        z-index: 10;
      "
      :style="{bottom: fold_units ? '0' : 'calc(50% - 24px)'}"
      @click="fold_units = !fold_units"
  >
    折叠
  </el-button>
  <div
      style="
        position: absolute;
        z-index: 10;
        /*padding: 8px;*/
        /*padding-bottom: 24px;*/
        /*padding: 4px 4px 50px 4px;*/
        /*background-color: grey;*/
        width: 100%;
        margin: 0 -20px;
        bottom: 0;
        /*bottom: 24px;*/
        transition: height 0.4s;
      "
      :style="{height: fold_units ? '0' : 'calc(50% - 24px)'}"
  >
    <div style="background-color: #d2d2d2; height: 100%;">
<!--      <div style="background-color: cyan; padding: 8px;">-->
<!--        <el-button>测试</el-button>-->
<!--      </div>-->
      <el-scrollbar height="100%">
        <div style="display: flex; flex-wrap: wrap;">
          <div
              v-for="(unit, id_) in loaded_unit_data"
              class="unit-pic"
              @click="Object.assign(form.data, unit);selected_obj_id = id_;"
          >
            <UnitPicOrigin :style="{'--element-color': ele2color[getElementCss(unit['element'])]}" :unit="unit" :size="82" class="unit-pic"/>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResourceManagerUnit",
  data() {
    return {}
  }
}
</script>

<style scoped>
.unit-pic {
  /*width: 82px;*/
  /*height: 82px;*/
  filter: none;
  transition: filter 0.2s linear;
  /*margin: 0;*/
  margin: 2px;
  cursor: pointer;
  /*border: 27px solid;*/
  /*border-image-source: url(/assets/worldflipper/ui/unit_frame.png);*/
  /*border-image-slice: 27;*/
}
.unit-pic:hover {
  filter: drop-shadow(0 0 8px var(--element-color));
}
</style>
