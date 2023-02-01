<script setup>
// import {getUnitPicUrl, unit_data} from '@/components/party_manager'
import {add_event, change_event, del_event, event_data, get_event_data} from '@/components/resource_manager'
import moment from 'moment/moment'
import EventCard from "@/components/event/EventCard.vue";
import {onMounted, reactive, ref} from "vue";

const form = reactive({
  title: '',
  description: '',
  type: '',
  time_start: 0,
  time_end: 0,
  image_url: '',
  origin_url: '',
  notes: '',
})

function clear_form() {
  Object.assign(form, {
    title: '',
    description: '',
    type: '',
    time_start: 0,
    time_end: 0,
    image_url: '',
    origin_url: '',
    notes: '',
  })
}

const on_edit = ref('')

const event_type = new Map([
    ['活动 (无限池)', 'event_box_gacha'],
    ['活动 (商店)', 'event_shop'],
    ['活动 (水滴类)', 'event_lite'],
    ['活动 (其他)', 'event_other'],
    ['卡池 (角色)', 'gacha_pool_unit'],
    ['卡池 (装备)', 'gacha_pool_armament'],
    ['运营活动', 'operational_activities'],
    ['运营直播', 'operational_live'],
    ['运营福利', 'operational_gift'],
    ['(常驻)副本实装', 'release_boss'],
    ['强化实装 (六板/武器/ex)', 'release_strengthen'],
    ['上修实装', 'release_correction'],

])
onMounted(() => {
  get_event_data()
})
</script>
<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <div style="position: absolute; height: 0; top: 0; right: 0; z-index: 10;">
      <div
          style="background-color: lightgrey; padding: 16px 16px 1px; border-radius: 8px; box-shadow: var(--el-box-shadow);"
          :style="{'border': on_edit ? '#00bd7e 2px solid' : 'transparent 2px solid'}"
      >
      <el-form :model="form" style="max-width: 480px;" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"/>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" filterable>
            <el-option v-for="entry in event_type.entries()" :label="String(entry[0])" :value="entry[1]"/>
<!--            <el-option label="活动 (无限池)" value="event_box_gacha"/>-->
<!--            <el-option label="活动 (商店)" value="event_shop"/>-->
<!--            <el-option label="卡池 (角色)" value="gacha_pool_unit"/>-->
<!--            <el-option label="卡池 (装备)" value="gacha_pool_armament"/>-->
<!--            <el-option label="运营活动" value="operational_activities"/>-->
<!--            <el-option label="运营直播" value="operational_live"/>-->
<!--            <el-option label="运营福利" value="operational_gift"/>-->
<!--            <el-option label="强化实装 (六板/武器/ex)" value="release_strengthen"/>-->
<!--            <el-option label="上修实装" value="release_correction"/>-->
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker
                v-model="form.time_start"
                type="datetime"
                placeholder="开始时间"
                format="YYYY/MM/DD hh:mm:ss"
                :default-time="new Date(2000, 3, 17, 12, 0, 0)"
                value-format="x"
                style="width: 100%"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span>　-</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker
                v-model="form.time_end"
                type="datetime"
                placeholder="结束时间(不必要)"
                format="YYYY/MM/DD hh:mm:ss"
                :default-time="new Date(2000, 3, 17, 12, 0, 0)"
                value-format="x"
                style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="图片地址">
          <el-input v-model="form.image_url"/>
        </el-form-item>
        <el-form-item label="源地址">
          <el-input v-model="form.origin_url"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.notes"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="() => {
            if (!on_edit) {
              add_event(form);
              clear_form();
            }else {
              change_event(on_edit, form);
              on_edit = '';
              clear_form();
            }
          }">{{ on_edit ? '修改' : '添加' }}</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
<!--    {{ form }}-->
    <div style="height: 100%; padding-top: 430px; /* background-color: red; */">
<!--      <div v-for="v in event_data.hasOwnProperty('events') ? Object.entries(event_data.events) : []">-->
<!--      <div v-for="v in event_data.hasOwnProperty('events') ? Object.entries(event_data.events).map(value => Object.assign({id: value[0]}, value[1])) : []">-->
<!--        {{ v }}-->
<!--      </div>-->
      <el-table :data="event_data.hasOwnProperty('events') ? Object.entries(event_data.events).map(value => Object.assign({id: value[0]}, value[1])) : []" height="100%" style="background-color: rgba(255, 255, 255, 0.55);">
<!--      <el-table :data="[]" height="100%" style="background-color: rgba(255, 255, 255, 0.55);">-->
        <el-table-column type="expand">
          <template #default="props">
            <div style="padding: 16px;">
              <p>图片地址: <a :href="props.row.image_url" target="_blank">{{ props.row.image_url }}</a></p>
              <p>源地址: <a :href="props.row.origin_url" target="_blank">{{ props.row.origin_url }}</a></p>
<!--              <p>备注: {{ props.row.notes }}</p>-->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID"/>
        <el-table-column prop="title" label="标题"/>
        <el-table-column prop="description" label="描述"/>
        <el-table-column prop="type" label="类型"/>
        <el-table-column label="开始时间">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ moment(new Date(parseInt(scope.row.time_start * 1000))).format('YYYY/MM/DD hh:mm:ss') }}</span>
            </div>
          </template>
        </el-table-column>
<!--        <el-table-column prop="time_start" label="开始时间"/>-->
        <el-table-column label="结束时间">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ moment(new Date(parseInt(scope.row.time_end * 1000))).format('YYYY/MM/DD hh:mm:ss') }}</span>
            </div>
          </template>
        </el-table-column>
<!--        <el-table-column prop="time_end" label="结束时间"/>-->
<!--        <el-table-column prop="image_url" label="图片地址"/>-->
<!--        <el-table-column prop="origin_url" label="源地址"/>-->
        <el-table-column prop="notes" label="备注"/>
        <el-table-column fixed="right" label="Operations" width="140">
          <template #default="scope">
            <el-button type="primary" size="small" @click="() => {
              if (on_edit === scope.row.id) {
                clear_form();
                on_edit = '';
              } else {
                Object.assign(form, {
                  ...event_data.events[scope.row.id],
                  time_start: event_data.events[scope.row.id].time_start * 1000,
                  time_end: event_data.events[scope.row.id].time_end * 1000,
                });
                on_edit = scope.row.id;
              }
            }">编辑</el-button>
            <el-popconfirm title="确认删除?" @confirm="del_event(scope.row.id)">
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
<!--  <div style="display: flex; flex-direction: column; flex-wrap: wrap;">-->
<!--&lt;!&ndash;    <el-row v-for="unit in unit_data" style="border: red solid 1px; width: 360px;">&ndash;&gt;-->
<!--    <div style="display: flex; align-items: flex-start;" v-for="item in event_data.content">-->
<!--      <div>{{ moment(new Date(parseInt(item.timeStart) * 1000)).format('YYYY/MM/DD hh:mm:ss') }}</div>-->
<!--&lt;!&ndash;      {{ new Date('2021/3/31').getTime() / 1000 }}&ndash;&gt;-->
<!--&lt;!&ndash;      {{ new Date('2021/4/9').getTime() / 1000 }}&ndash;&gt;-->
<!--      {{ item }}-->
<!--&lt;!&ndash;      <div></div>&ndash;&gt;-->
<!--    </div>-->
<!--&lt;!&ndash;    <el-card v-for="event in event_data" style="border: red solid 1px; margin: 6px; width: 360px;">&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <img :src="''" style="width: 82px; height: 82px;" loading="lazy" alt=""/>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        {{ unit }}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    </el-card>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;    </el-row>&ndash;&gt;-->
<!--  </div>-->
</template>

<script>
export default {
  name: "ResourceManagerEvent",
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
