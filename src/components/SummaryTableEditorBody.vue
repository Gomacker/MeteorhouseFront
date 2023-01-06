<template>
  <div class="editor-body" v-if="table_data.hasOwnProperty('property')">
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
                  <el-color-picker v-model="table_data.property['main_color']"/>
                </el-col>
                <el-col :span="6">
                  <span class="el-form-item__label">副色</span>
                  <el-color-picker v-model="table_data.property['sub_color']"/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-date-picker v-model="table_data.property['update_time']" value-format="YYYY-MM-DD"/>
            </el-form-item>
            <el-form-item label="小关于">
              <el-input type="textarea" v-model="table_data.property['little_about']"/>
            </el-form-item>
            <el-form-item label="Banner">
              <el-input placeholder="(css here)" v-model="table_data.property.banner"/>
            </el-form-item>
            <el-form-item label="Background">
              <el-input placeholder="(css here)" v-model="table_data.property.background"/>
            </el-form-item>
            <el-form-item label="Background">
              <el-input type="textarea" v-model="table_data.property.footer" :rows="6"/>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col v-for="(obj, index) in table_data.content" :span="24">
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
                  if(col.type === 'TextRegion' && col.data['full']) {
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
                  <el-input v-if="col.type === 'Party'" type="textarea"
                            :model-value = "JSON.stringify(col.data.party)"
                            @input = "v => {
                              // try {
                              //   col.data.party = JSON.parse(v)
                              // }catch (e){}
                              col.data.party = JSON.parse(v)
                            }"
                            :rows = "3"
                  />
                  <!--                            v-model="col.data.party"-->
                  <!--                            :formatter="s => {return JSON.parse(s)}"-->
                  <!--                            :parser="s => {return JSON.stringify(s)}"-->
                  <!--                  {{ col }}-->
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
<!--    {{ JSON.stringify(table_data, null, 2) }}-->
  </div>
</template>

<script>
import {Plus, ArrowLeft, ArrowRight, DeleteFilled} from '@element-plus/icons-vue';
import PartyCard from "@/components/party/PartyCardAnise.vue";
import {table_data, type_change} from "./summary_table_editor";

export default {
  name: "SummaryTableEditorBody",
  methods: {type_change},
  data(){
    return {
      table_data: table_data
    }
  },
  components: {PartyCard, Plus, ArrowLeft, ArrowRight, DeleteFilled}
}
</script>

<style scoped>
.editor-body {
  max-width: 1036px;
  margin: auto;
}
.editor-body:deep(div){
  margin: 2px 0;
}
</style>