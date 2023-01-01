<script setup>
// defineProps({
//   name: "Calculator"
// })
import {ref} from "vue";
import axios from "axios";
import {Picture, CircleClose} from '@element-plus/icons-vue'
import UnitCard from "@/components/UnitCard.vue";
import {getUnitPicUrl, unit_data, armament_data, getArmamentPicUrl} from "@/components/party_manager";
import PartyCard from "@/components/calculator/PartyCardAnise.vue";
import '@/assets/summary_table.css'

let menu_folded = ref(false)

</script>
<script>
import {ref} from "vue";

const selected = ref(null)
const sel_arma_list = ref(false)
export default {
  data() {
    return {
      sel_arma_list: sel_arma_list
    }
  },
  methods: {
    select(i){
      if (this.is_select(i)) {
        selected.value = null
      }else {
        selected.value = i
      }
    },
    is_select(i){
      // console.log('sel:' + selected, 'i:' + i)
      return selected.value === i
    }
  }
}
</script>


<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <span style="color: blue;">{{ Object.keys(unit_data).length }} units loaded</span>
    <span style="color: blue;">{{ Object.keys(armament_data).length }} armaments loaded</span>
    <span style="color: blue;">Other Info here</span>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; align-items: center;">
<!--      <div class="party-editor">-->
        <div class="party" style="display: flex; border: 6px solid gray;">
          <div class="union">
            <div class="wfo-slot main">
              <img src="" alt=""/>
              <div style="text-align: center;">Leader</div>
            </div>
            <div class="wfo-slot armament">
              <img src="" alt=""/>
              <div style="text-align: center;">Arma</div>
            </div>
            <div class="wfo-slot unison">
              <img src="" alt=""/>
              <div style="text-align: center;">Unison</div>
            </div>
            <div class="wfo-slot core">
              <img src="" alt=""/>
              <div style="text-align: center;">Core</div>
            </div>
          </div>
          <div class="union">
            <div class="wfo-slot main">
              <img src="" alt=""/>
              <div style="text-align: center;">Main</div>
            </div>
            <div class="wfo-slot armament">
              <img src="" alt=""/>
              <div style="text-align: center;">Arma</div>
            </div>
            <div class="wfo-slot unison">
              <img src="" alt=""/>
              <div style="text-align: center;">Unison</div>
            </div>
            <div class="wfo-slot core">
              <img src="" alt=""/>
              <div style="text-align: center;">Core</div>
            </div>
          </div>
          <div class="union">
            <div class="wfo-slot main">
              <img src="" alt=""/>
              <div style="text-align: center;">Main</div>
            </div>
            <div class="wfo-slot armament">
              <img src="" alt=""/>
              <div style="text-align: center;">Arma</div>
            </div>
            <div class="wfo-slot unison">
              <img src="" alt=""/>
              <div style="text-align: center;">Unison</div>
            </div>
            <div class="wfo-slot core">
              <img src="" alt=""/>
              <div style="text-align: center;">Core</div>
            </div>
          </div>
        </div>
<!--      </div>-->
<!--      <UnitCard v-if="Object.keys(unit_data).length > 0" :id_="1" :unit="unit_data['1']"/>-->
<!--      <UnitCard v-if="Object.keys(unit_data).length > 0" :id_="1" :unit="unit_data['1']"/>-->
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
      <el-button @click="sel_arma_list = !sel_arma_list">{{ sel_arma_list ? '装备' : '角色'}}</el-button>
    </div>
    <el-scrollbar style="
    display: flex;
    flex-wrap: wrap;
    padding-right: 4px;
    /*overflow-y: scroll;*/
    height: 90%;
    "
    always
    >
      <div :style="{display: (!sel_arma_list) ? 'none' : 'flex'}" class="wfo-list">
        <div
            v-for="(unit, i) in unit_data"
            class="wfo-obj"
            :class="[is_select('u' + i) ? 'selected' : '', 'ele-' + unit['Element'].toLowerCase()]"
            :id="'wfo-u' + i"
            @click="select('u' + i)"
        >
          <el-image
              :src="getUnitPicUrl(unit)"
              :title="i + ': ' + unit['WfExId']"
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
      <div :style="{display: (sel_arma_list) ? 'none' : 'flex'}" class="wfo-list">
        <div
            v-for="(armament, i) in armament_data"
            class="wfo-obj"
            :class="[is_select('a' + i) ? 'selected' : '', 'ele-' + armament['Element'].toLowerCase()]"
            :id="'wfo-a' + i"
            @click="select('a' + i)"
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
  border: solid white 2px;
  border-radius: 4px;
  /*box-shadow: var(--el-box-shadow);*/
  width: 62px;
  height: 62px;
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
  border-color: red;
}
.ele-none::before{background-image: url("api/static/worldflipper/icon/none.png");}
.ele-fire::before{background-image: url("api/static/worldflipper/icon/fire.png");}
.ele-water::before{background-image: url("api/static/worldflipper/icon/water.png");}
.ele-thunder::before{background-image: url("api/static/worldflipper/icon/thunder.png");}
.ele-wind::before{background-image: url("api/static/worldflipper/icon/wind.png");}
.ele-light::before{background-image: url("api/static/worldflipper/icon/light.png");}
.ele-dark::before{background-image: url("api/static/worldflipper/icon/dark.png");}
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
