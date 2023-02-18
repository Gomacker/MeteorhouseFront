<script setup>

import {unit_data} from "@/components/party_manager";
import UnitPicOrigin from "@/components/party/components/UnitPicOrigin.vue";</script>
<template>
  {{ get_real_text(keyword) }}
  <el-input v-model="keyword"></el-input>
  <div style="display: flex; flex-wrap: wrap; justify-content: center;">
<!--    {{ k }}: {{ v }}-->

    <div
        v-for="(v, k) in get_objects()"
        style="
          /*height: 160px;*/
          margin: 4px;
          display: flex;
          flex-direction: column;
          
        "
    >
      <UnitPicOrigin
          :unit="v"
          :size="120"
      />
      <div style="text-align:center; width: 120px; font-size: 20px; padding-bottom: 8px; font-weight: bold;">{{ v.name[0] }}</div>
    </div>
  </div>
</template>
<script>

import {ref} from "vue";
import {unit_data} from "@/components/party_manager";

const keyword = ref('毒')

function get_real_text(text) {
  text = text.toLowerCase()
  if (text.match(/down$/)) text = text.substring(0, text.length - 4) + '属性抗性降低'
  if (text === '贯通') text = '贯穿'
  if (text === '净化') text = '解除'
  if (text === '驱散') text = '消除'
  return text
}

const ff = ref((unit, key) => {
  // console.log(unit)
  // console.log(key)
  let text = keyword.value
  text = get_real_text(text)
  // return unit.element === 1
  // console.log('bruhinubgweg')
  // console.log(unit)
  return unit.skill_description.toLowerCase().includes(text) ||
      unit.ability1.toLowerCase().includes(text) ||
      unit.ability2.toLowerCase().includes(text) ||
      unit.ability3.toLowerCase().includes(text) ||
      unit.ability4.toLowerCase().includes(text) ||
      unit.ability5.toLowerCase().includes(text) ||
      unit.ability6.toLowerCase().includes(text) ||
      unit.cv.toLowerCase() === text
})

function get_objects() {
  // console.log(unit_data.value)
  return Object.fromEntries(
      Object
          .entries(unit_data.value)
          .filter(
              (_v, _k) => {
                return ff.value(_v[1], _k)
              }
          )
  )
}
export default {
  data() {
    return {
      keyword: keyword,
    }
  },
  mounted() {
    const query = this.$route['query']
    if (query['text']) {
      keyword.value = query['text']
    }
  },
  methods:{
    get_objects,
    get_real_text
  }
}
</script>
<style scoped>

</style>