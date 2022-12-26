<script setup>
// defineProps({
//   name: "Calculator"
// })
import {ref} from "vue";
import axios from "axios";
import {Picture, CircleClose} from '@element-plus/icons-vue'
import UnitCard from "@/components/UnitCard.vue";

const page_name = 'Calculator'
const unit_list = ref({})
const menu_folded = ref(false)
// class Unit{
//   constructor(data) {
//     this.extractor_id = data['WfExId']
//   }
// }
axios.get(
    // 'http://127.0.0.1:8000/unit_data',
    'api/unit_data/',
    {
    }
).then(res => {
  // unit_list.value = new Map(Object.entries(res.data))
  unit_list.value = res.data
})
</script>
<script>
import {ref} from "vue";

const selected = ref(null)
export default {
  data() {
    return {
      selected: selected
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
<!--  <el-scrollbar>-->
<!--  {{ Object.keys(unit_list).length }}-->
    <UnitCard v-if="Object.keys(unit_list).length > 0" :id_="1" :unit="unit_list['1']"/>
<!--  </el-scrollbar>-->
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
    <el-scrollbar style="
    display: flex;
    flex-wrap: wrap;
    padding-right: 8px;
    /*overflow-y: scroll;*/
    height: 100%;
    "
    always
    >
      <div style="margin: 2px;"></div>
  <!--    <div-->
  <!--        v-for="(unit, i) in unit_list"-->
  <!--        class="wfo-slot"-->
  <!--        :class="[is_select('u' + i) ? 'selected' : '', 'ele-' + unit['Element'].toLowerCase()]"-->
  <!--        :id="'wfo-u' + i"-->
  <!--        @click="select('u' + i)"-->
  <!--    >-->
        <el-image
            v-for="(unit, i) in unit_list"
            class="wfo-slot"
            :class="[is_select('u' + i) ? 'selected' : '', 'ele-' + unit['Element'].toLowerCase()]"
            :id="'wfo-u' + i"
            @click="select('u' + i)"

            :src="'http://127.0.0.1:8000/static/worldflipper/unit/square212x/base/' + unit['WfExId'] + '.png'"
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
    </el-scrollbar>
<!--    </div>-->
<!--    {{ unit }}-->
  </div>
<!--  {{ unit_list['1'] }}-->
</template>


<style scoped>
.wfo-slot{
  margin: -1px 2px;
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
.wfo-menu{
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
.wfo-slot::before{
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
.wfo-slot:deep(img){
  border-radius: 4px;
}
</style>