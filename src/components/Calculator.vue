<script setup>
import {ref} from "vue";
import {Picture, CircleClose} from '@element-plus/icons-vue'
import UnitCard from "@/components/UnitCard.vue";
import {is_login} from '@/components/user'
import {
  getUnitPicUrl,
  unit_data,
  armament_data,
  getArmamentPicUrl,
  getArmamentCorePicUrl,
  getElementCss
} from "@/components/party_manager";
import PartyCard from "@/components/party/PartyCardAnise.vue";
import '@/assets/summary_table.css'
import UnitWikiCardBody from '@/components/party/components/UnitWikiCardBody.vue'
import UnitPicOrigin from "@/components/party/components/UnitPicOrigin.vue";
const view_filter = ref(obj => {return true})

let menu_folded = ref(false)
</script>
<script>
import {ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const selected_unit = ref(0)
const selected = ref(null)
const sel_arma_list = ref(false)
const loaded_party_id = ref('')
const party_id_input = ref('')
const party_title = ref('')
const calculate_party = ref({'union1': [0, 0, 0, 0], 'union2': [0, 0, 0, 0], 'union3': [0, 0, 0, 0]})
const party_replacements = ref({'union1': [[], [], [], []], 'union2': [[], [], [], []], 'union3': [[], [], [], []]})
const party_manaboard2 = ref({'union1': [[-1, -1, -1], [-1, -1, -1]], 'union2': [[-1, -1, -1], [-1, -1, -1]], 'union3': [[-1, -1, -1], [-1, -1, -1]]})
const calculate_party_output = ref('')
const edit_module = ref('')
function get_pos(sel) {
  let union = '', pos = -1;
  if (sel.startsWith('party-union1-')) union='union1';
  else if (sel.startsWith('party-union2-')) union='union2';
  else if (sel.startsWith('party-union3-')) union='union3';
  if (sel.endsWith('main')) pos = 0;
  else if (sel.endsWith('unison')) pos = 1;
  else if (sel.endsWith('armament')) pos = 2;
  else if (sel.endsWith('core')) pos = 3;

  return [union, pos]
}

function clear_party() {
  calculate_party.value = {'union1': [0, 0, 0, 0], 'union2': [0, 0, 0, 0], 'union3': [0, 0, 0, 0]};
  party_replacements.value = {'union1': [[], [], [], []], 'union2': [[], [], [], []], 'union3': [[], [], [], []]}
  party_manaboard2.value = {'union1': [[-1, -1, -1], [-1, -1, -1]], 'union2': [[-1, -1, -1], [-1, -1, -1]], 'union3': [[-1, -1, -1], [-1, -1, -1]]}
  party_title.value = ''
}
export default {
  data() {
    return {
      sel_arma_list: sel_arma_list,
      calculate_party: calculate_party,
      party_replacements: party_replacements,
      party_manaboard2: party_manaboard2,
      party_title: party_title,
      calculate_party_output: calculate_party_output,
      edit_module: edit_module,
      party_id_input: party_id_input,
      loaded_party_id: loaded_party_id
    }
  },
  methods: {
    select(sel){
      if (this.is_select(sel)) {
        selected.value = null
      }else {
        if (!selected.value) {
          selected.value = sel
          if (selected.value.startsWith('object-unit-')) {
            selected_unit.value = eval(selected.value.slice(12))
          }
        }
        else if (selected.value.startsWith('party-')) {
          if (sel.startsWith('object-')) {
            let p = get_pos(selected.value)

            if (sel === 'object-empty') {
              calculate_party.value[p[0]][p[1]] = 0
              selected.value = null
            }
            else if (p[1] === 0 || p[1] === 1) {
              if (sel.startsWith('object-unit-')) {
                calculate_party.value[p[0]][p[1]] = eval(sel.slice(12))
                selected.value = null
              }
            }
            else if (p[1] === 2 || p[1] === 3) {
              if (sel.startsWith('object-armament-')) {
                calculate_party.value[p[0]][p[1]] = eval(sel.slice(16))
                selected.value = null
              }
            }
          }
          else if (sel.startsWith('party-')) {
            if (((selected.value.endsWith('main') || selected.value.endsWith('unison')) &&
                (sel.endsWith('main') || sel.endsWith('unison')))
                ||
                ((selected.value.endsWith('armament') || selected.value.endsWith('core')) &&
                (sel.endsWith('armament') || sel.endsWith('core')))
            ) {
              let pos1 = get_pos(selected.value)
              let pos2 = get_pos(sel)
              if (sel.split('-')[2] === 'replacement') {
                const temp = calculate_party.value[pos1[0]][pos1[1]]
                calculate_party.value[pos1[0]][pos1[1]] = calculate_party.value[pos2[0]][pos2[1]]
                calculate_party.value[pos2[0]][pos2[1]] = temp
              }
              else {
                const temp = calculate_party.value[pos1[0]][pos1[1]]
                calculate_party.value[pos1[0]][pos1[1]] = calculate_party.value[pos2[0]][pos2[1]]
                calculate_party.value[pos2[0]][pos2[1]] = temp
              }
              selected.value = null
            }
            else {
              selected.value = sel
            }
          }
        }
        else if (selected.value.startsWith('object-')) {
          if (sel.startsWith('object-')) {
            selected.value = sel
            if (selected.value.startsWith('object-unit-')) {
              selected_unit.value = eval(selected.value.slice(12))
            }
          }
          if (sel.startsWith('party-')) {
            let p = get_pos(sel)

            if (selected.value === 'object-empty') {
              calculate_party.value[p[0]][p[1]] = 0
              selected.value = null
            }
            else if (p[1] === 0 || p[1] === 1) {
              if (selected.value.startsWith('object-unit-')) {
                calculate_party.value[p[0]][p[1]] = eval(selected.value.slice(12))
                selected.value = null
              }
            }
            else if (p[1] === 2 || p[1] === 3) {
              if (selected.value.startsWith('object-armament-')) {
                calculate_party.value[p[0]][p[1]] = eval(selected.value.slice(16))
                selected.value = null
              }
            }
          }
        }
        else {}
        // selected.value = i
      }
    },
    is_select(i){
      return selected.value === i
    },
    upload() {
      const data = {
        title: party_title.value,
        party: calculate_party.value,
        params: {
          replacements: party_replacements.value,
          manaboard2: party_manaboard2.value,
        }
      }
      if (loaded_party_id.value) data.release_id = loaded_party_id.value;
      axios.post(
          '/api/update_party/',
          data
      ).then(
          r => {
            console.log(r.data)
            if (r.data['result'] === 'success') {
              ElMessage.success('上传成功')
              if (loaded_party_id.value) {
                loaded_party_id.value = ''
                clear_party();
              }
            }else {
              ElMessage.error('上传失败')
            }
          }
      ).catch(
          () => {
            ElMessage.error('上传失败(连接失败)')
          }
      )
    },
    load_party() {
      axios.post(
          '/api/prd/',
          {
            release_id: party_id_input.value
          }
      ).then(
          r => {
            console.log(r.data)
            if (r.data.result === 'success') {
              ElMessage.success('导入成功')
              calculate_party.value = r.data.party.party
              party_title.value = r.data.party.title
              loaded_party_id.value = r.data.party.id
              party_manaboard2.value = r.data.party.params.manaboard2
            }else {

              ElMessage.error('导入失败')
            }
          }
      )
    },
    clear_party
  }
}
</script>


<template>
  <div style="width: 100%; height: 100%; padding: 0; overflow: hidden;">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div v-if="is_login" style="padding: 4px;">
        <!--      <el-button type="success" plain @click="noheader_upload">[debug](无头)上传队伍</el-button>-->
        <!--      <el-button type="warning" disabled plain>[debug]检查队伍存在性</el-button>-->
      </div>
      <div id="calculator-updater" style="display: flex; flex-direction: column; margin: 16px;">
        <div v-if="is_login" style="width: 480px;">
          <div style="margin-bottom: 12px;">
            <span style="margin: 0 8px;">要修改的盘子ID</span>
            <el-input v-model="party_id_input" style="width: 182px; margin: 0 8px;" :maxlength="8" placeholder="ID"/>
            <el-button style="margin: 0 8px;" type="primary" @click="load_party">
              读取
            </el-button>
            <el-button style="margin: 0 8px;" type="danger" v-if="false">
              删除
            </el-button>

          </div>
          <div>
            <span style="margin: 0 8px;">标题</span>
            <el-input v-model="party_title" :style="{width: is_login ? '300px' : '200px'}" style="margin: 0 8px;" :maxlength="40" show-word-limit placeholder="title"/>
            <el-button v-if="!loaded_party_id" style="margin: 0 8px;" :disabled="!is_login" @click="upload">
              上传队伍
            </el-button>
            <el-button v-else style="border: 2px #00bd7e solid; margin: 0 8px;" :disabled="!is_login" @click="upload">
              修改队伍
            </el-button>
          </div>
          
        </div>
      </div>
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; align-items: flex-start;">
        <!--      <div class="party-editor">-->
        <div id="calculator-party" class="party" style="display: flex; border: 6px solid gray;" @dragstart.prevent>
          <div class="union">
            <div class="wfo-slot main"
                 :class="[is_select('party-union1-main') ? 'selected' : '',
               unit_data.hasOwnProperty(calculate_party['union1'][0]) ? 'ele-' + getElementCss(unit_data[calculate_party['union1'][0]]['element']) : '']"
                 @click="select('party-union1-main')">
              <img :src="getUnitPicUrl(unit_data[calculate_party['union1'][0]])" alt=""/>
              <div style="text-align: center;">队长</div>
            </div>
            <div class="wfo-slot armament"
                 :class="[is_select('party-union1-armament') ? 'selected' : '']"
                 @click="select('party-union1-armament')">
              <img :src="getArmamentPicUrl(armament_data[calculate_party['union1'][2]])" alt=""/>
              <div style="text-align: center;">装备</div>
            </div>
            <div class="wfo-slot unison"
                 :class="[is_select('party-union1-unison') ? 'selected' : '',
               unit_data.hasOwnProperty(calculate_party['union1'][1]) ? 'ele-' + getElementCss(unit_data[calculate_party['union1'][1]]['element']) : '']"
                 @click="select('party-union1-unison')">
              <img :src="getUnitPicUrl(unit_data[calculate_party['union1'][1]])" alt=""/>
              <div style="text-align: center;">辅助角色</div>
            </div>
            <div class="wfo-slot core"
                 :class="[is_select('party-union1-core') ? 'selected' : '']"
                 @click="select('party-union1-core')">
              <img :src="getArmamentCorePicUrl(armament_data[calculate_party['union1'][3]])" alt=""/>
              <div style="text-align: center;">魂珠</div>
            </div>
          </div>
          <div class="union">
            <div class="wfo-slot main"
                 :class="[is_select('party-union2-main') ? 'selected' : '',
               unit_data.hasOwnProperty(calculate_party['union2'][0]) ? 'ele-' + getElementCss(unit_data[calculate_party['union2'][0]]['element']) : '']"
                 @click="select('party-union2-main')">
              <img :src="getUnitPicUrl(unit_data[calculate_party['union2'][0]])" alt=""/>
              <div style="text-align: center;">主要角色</div>
            </div>
            <div class="wfo-slot armament"
                 :class="[is_select('party-union2-armament') ? 'selected' : '']"
                 @click="select('party-union2-armament')">
              <img :src="getArmamentPicUrl(armament_data[calculate_party['union2'][2]])" alt=""/>
              <div style="text-align: center;">装备</div>
            </div>
            <div class="wfo-slot unison"
                 :class="[is_select('party-union2-unison') ? 'selected' : '',
               unit_data.hasOwnProperty(calculate_party['union2'][1]) ? 'ele-' + getElementCss(unit_data[calculate_party['union2'][1]]['element']) : '']"
                 @click="select('party-union2-unison')">
              <img :src="getUnitPicUrl(unit_data[calculate_party['union2'][1]])" alt=""/>
              <div style="text-align: center;">辅助角色</div>
            </div>
            <div class="wfo-slot core"
                 :class="[is_select('party-union2-core') ? 'selected' : '']"
                 @click="select('party-union2-core')">
              <img :src="getArmamentCorePicUrl(armament_data[calculate_party['union2'][3]])" alt=""/>
              <div style="text-align: center;">魂珠</div>
            </div>
          </div>
          <div class="union">
            <div class="wfo-slot main"
                 :class="[is_select('party-union3-main') ? 'selected' : '',
               unit_data.hasOwnProperty(calculate_party['union3'][0]) ? 'ele-' + getElementCss(unit_data[calculate_party['union3'][0]]['element']) : '']"
                 @click="select('party-union3-main')">
              <img :src="getUnitPicUrl(unit_data[calculate_party['union3'][0]])" alt=""/>
              <div style="text-align: center;">主要角色</div>
            </div>
            <div class="wfo-slot armament"
                 :class="[is_select('party-union3-armament') ? 'selected' : '']"
                 @click="select('party-union3-armament')">
              <img :src="getArmamentPicUrl(armament_data[calculate_party['union3'][2]])" alt=""/>
              <div style="text-align: center;">装备</div>
            </div>
            <div class="wfo-slot unison"
                 :class="[is_select('party-union3-unison') ? 'selected' : '',
               unit_data.hasOwnProperty(calculate_party['union3'][1]) ? 'ele-' + getElementCss(unit_data[calculate_party['union3'][1]]['element']) : '']"
                 @click="select('party-union3-unison')">
              <img :src="getUnitPicUrl(unit_data[calculate_party['union3'][1]])" alt=""/>
              <div style="text-align: center;">辅助角色</div>
            </div>
            <div class="wfo-slot core"
                 :class="[is_select('party-union3-core') ? 'selected' : '']"
                 @click="select('party-union3-core')">
              <img :src="getArmamentCorePicUrl(armament_data[calculate_party['union3'][3]])" alt=""/>
              <div style="text-align: center;">魂珠</div>
            </div>
          </div>
        </div>
        <div style="padding: 8px 4px; min-width: 480px;">
          <div style="display: flex; justify-content: center;">
            <div style="padding: 6px;">Module</div>
            <el-select v-model="edit_module">
              <el-option value="" label="None"/>
              <el-option value="manaboard2" label="二板"/>
              <el-option value="output" label="输出"/>
              <el-option value="card" label="角色卡"/>
            </el-select>
          </div>
          <div v-if="edit_module === 'manaboard2'" id="calculator-party-replacement" style="display: flex;" @dragstart.prevent>
            <div class="union" v-for="u in ['1', '2', '3']" style="padding: 8px 16px;">
              <div v-for="i in [0,1]" style="padding-bottom: 4px;">
                <div style="font-weight: 700;">
                  {{ unit_data[calculate_party['union' + u][i]] ? unit_data[calculate_party['union' + u][i]].name[0] : '--' }}
                </div>
                <div v-for="l in [0,1,2]" style="display: flex;">
                  <el-slider size="small" :disabled="!unit_data[calculate_party['union' + u][i]]" :min="-1" :max="5" :show-tooltip="false" v-model="party_manaboard2['union' + u][i][l]"/>
                  <div style="padding-left: 16px;">{{ party_manaboard2['union' + u][i][l] === -1 ? '-' : party_manaboard2['union' + u][i][l] }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="edit_module === 'output'" id="calculator-output" style="display: flex; flex-direction: column; margin: 16px;">
            <div>
              <el-button @click="calculate_party_output =
              JSON.stringify(
              {
                party:calculate_party,
                params:{
                  replacements: party_replacements,
                  manaboard2: party_manaboard2
                }
              }
            )">输出</el-button>
              <el-button @click="calculate_party = JSON.parse(calculate_party_output).party">读取</el-button>
              <el-button type="danger" @click="clear_party()">重置</el-button>
            </div>
            <el-input type="textarea" rows="4" style="width: 480px; padding: 16px 0;" v-model="calculate_party_output"></el-input>
          </div>
          <div
              v-if="edit_module === 'card'"
              id="calculator-unitcard"
              style="
              width: 600px;
              height: 30px;
              /*margin: 16px;*/
              transform: scale(0.625);
              transform-origin: 0 0;
            "
          >
            <UnitWikiCardBody v-if="selected_unit" :unit="unit_data[selected_unit]"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-button
      style="
      position: absolute;
      right: 0;
      border-radius: 0;
      z-index: 10;
      transition: bottom 0.3s ease;
    "
      :style="{bottom: menu_folded ? 0 : '40vh'}"
      @click="menu_folded = !menu_folded"
  >
    Fold
  </el-button>
  <div class="wfo-menu"
       :class="{fold: menu_folded}"
  >
    <div style="margin: 4px; height: 10%; overflow: hidden;" :style="{display: menu_folded ? 'none' : ''}">
      <el-button @click="sel_arma_list = !sel_arma_list">{{ sel_arma_list ? '角色' : '装备'}}</el-button>
      <el-button @click="view_filter = obj => {return true}">All</el-button>
      <el-button @click="view_filter = obj => {return obj['Element'] === 'None'}" size="small"><el-image src="/assets/worldflipper/icon/none.png" style="width: 16px;"/></el-button>
      <el-button @click="view_filter = obj => {return obj['Element'] === 'Fire' || obj['element'] === 0}" size="small"><el-image src="/assets/worldflipper/icon/fire.png" style="width: 16px;"/></el-button>
      <el-button @click="view_filter = obj => {return obj['Element'] === 'Water' || obj['element'] === 1}" size="small"><el-image src="/assets/worldflipper/icon/water.png" style="width: 16px;"/></el-button>
      <el-button @click="view_filter = obj => {return obj['Element'] === 'Thunder' || obj['element'] === 2}" size="small"><el-image src="/assets/worldflipper/icon/thunder.png" style="width: 16px;"/></el-button>
      <el-button @click="view_filter = obj => {return obj['Element'] === 'Wind' || obj['element'] === 3}" size="small"><el-image src="/assets/worldflipper/icon/wind.png" style="width: 16px;"/></el-button>
      <el-button @click="view_filter = obj => {return obj['Element'] === 'Light' || obj['element'] === 4}" size="small"><el-image src="/assets/worldflipper/icon/light.png" style="width: 16px;"/></el-button>
      <el-button @click="view_filter = obj => {return obj['Element'] === 'Dark' || obj['element'] === 5}" size="small"><el-image src="/assets/worldflipper/icon/dark.png" style="width: 16px;"/></el-button>
    </div>
    <el-scrollbar
        style="
    display: flex;
    flex-wrap: wrap;
    padding-right: 4px;
    /*overflow-y: scroll;*/
    height: 90%;
    "
        always
    >
      <div :style="{display: sel_arma_list ? 'none' : 'flex'}" class="wfo-list">
        <div
            class="wfo-obj"
            style="background-color:#fff;"
            :class="[is_select('object-empty') ? 'selected' : '']"
            id="wfo-empty"
            @click="select('object-empty')"
        >
          <el-image
              :src="getUnitPicUrl({})"
              title="empty"
              loading="lazy"
              @dragstart.prevent
          >
            <div slot="placeholder">
              <el-icon><Picture/></el-icon>
            </div>
            <div slot="error">
              fbd
              <el-icon><CircleClose/></el-icon>
            </div>
          </el-image>
        </div>
        <div
            v-for="(unit, i) in Object.fromEntries(Object.entries(unit_data).filter((v, k) => {return view_filter(v[1])}))"
            class="wfo-obj"
            :class="[is_select('object-unit-' + i) ? 'selected' : '', 'ele-' + getElementCss(unit['element'])]"
            :id="'wfo-u' + i"
            @click="select('object-unit-' + i)"
        >
          <!--          <UnitPicOrigin :unit="unit" :size="82"/>-->
          <el-image
              :src="getUnitPicUrl(unit)"
              :title="i + ': ' + unit['extraction_id']"
              loading="lazy"
              @dragstart.prevent
          >
            <div slot="placeholder">
              <el-icon><Picture/></el-icon>
            </div>
            <div slot="error">
              fbd
              <el-icon><CircleClose/></el-icon>
            </div>
          </el-image>
        </div>
      </div>
      <div :style="{display: (!sel_arma_list) ? 'none' : 'flex'}" class="wfo-list">
        <div
            class="wfo-obj"
            :class="[is_select('object-empty') ? 'selected' : '']"
            id="wfo-empty"
            @click="select('object-empty')"
        >
          <el-image
              :src="getUnitPicUrl({})"
              title="empty"
              loading="lazy"
              @dragstart.prevent
          >
            <div slot="placeholder">
              <el-icon><Picture/></el-icon>
            </div>
            <div slot="error">
              fbd
              <el-icon><CircleClose/></el-icon>
            </div>
          </el-image>
        </div>
        <div
            v-for="(armament, i) in Object.fromEntries(Object.entries(armament_data).filter((v, k) => {return view_filter(v[1])}))"
            class="wfo-obj"
            :class="[is_select('object-armament-' + i) ? 'selected' : '', 'ele-' + armament['Element'].toLowerCase()]"
            :id="'wfo-a' + i"
            @click="select('object-armament-' + i)"
        >
          <el-image
              :src="getArmamentPicUrl(armament)"
              :title="i + ': ' + armament['WfExId']"
              loading="lazy"
              @dragstart.prevent
          >
            <div slot="placeholder">
              <el-icon><Picture/></el-icon>
            </div>
            <div slot="error">
              fbd
              <el-icon><CircleClose /></el-icon>
            </div>
          </el-image>
        </div>
      </div>
    </el-scrollbar>
    <!--    {{ unit }}-->
  </div>
</template>


<style scoped>
.party:deep(img) {
  display: block;
}
.party:hover{
  box-shadow: 0 0 8px 0 black;
}
.wfo-list{
  display: flex;
  flex-wrap: wrap;
}

.wfo-obj{
  margin: 2px;
  /*display: inline-block;*/
  /*margin: 2px;*/
  /*transition: margin 0.6s;*/
  background-color: #fff;
  background-size: 62px;
  background-repeat: no-repeat;
  box-sizing: content-box;
  border: solid transparent 2px;
  border-radius: 4px;
  /*box-shadow: var(--el-box-shadow);*/
  width: 72px;
  height: 72px;
  /*width: 82px;*/
  /*height: 82px;*/
  user-select: none;
  cursor: pointer;

}
.party-editor{
  width: 480px;
  height: 205px;
  background: white;
  border: 6px gray solid;
  box-sizing: content-box;
  border-radius: 6px;
  transition: box-shadow 0.2s linear;
  /*box-shadow: none;*/
}

.party-editor:hover{
  box-shadow: black 0 0 8px;
}

.wfo-menu{
  z-index: 20;
  background-color: lightgray;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 40vh;
  padding: 8px;
  width: 100%;
  transition: padding, height 0.3s ease;
}
.wfo-menu.fold{
  height: 0;
  padding: 0 8px;
}
.selected{
  border-color: #c287ff;
}
.ele-none::before{background-image: url("/assets/worldflipper/icon/none.png");}
.ele-fire::before{background-image: url("/assets/worldflipper/icon/fire.png");}
.ele-water::before{background-image: url("/assets/worldflipper/icon/water.png");}
.ele-thunder::before{background-image: url("/assets/worldflipper/icon/thunder.png");}
.ele-wind::before{background-image: url("/assets/worldflipper/icon/wind.png");}
.ele-light::before{background-image: url("/assets/worldflipper/icon/light.png");}
.ele-dark::before{background-image: url("/assets/worldflipper/icon/dark.png");}
.wfo-obj::before{
  content: '';
  width: 16px;
  height: 16px;
  z-index: 1;
  border-radius: 0 4px 0 0;
  background-color: white;
  /*background-image: url("api/static/worldflipper/icon/fire.png");*/
  background-size: 13px;
  background-position: 1px 2px;
  background-repeat: no-repeat;
  position: absolute;
  display: block;
  top: -2px;
  right: -2px;
}
.wfo-obj:deep(img){
  border-radius: 4px;
}
</style>
