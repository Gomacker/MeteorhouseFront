<script setup>
import {ArrowDownBold, DocumentCopy, Search} from '@element-plus/icons-vue'
</script>

<template>
  <div style="display: flex; height: 100%; flex-direction: column;">
    <div style="display: flex; flex-direction: column; padding: 8px;">
<!--      <div>-->
<!--        {{ current_page }}-->
<!--        <el-button @click="get_data">-->
<!--          [debug] 获取数据-->
<!--        </el-button>-->
<!--      </div>-->
      <div style="display: flex; justify-content: center; align-items: center;">
        <div style="padding: 0 8px;">
          搜索
        </div>
        <el-input
            v-model="search_content"
            :placeholder="search_placeholder"
            style="margin: 0 2px; height: 48px; width: 80%;"
            @keydown.enter="search_party(search_content)"
        >
        </el-input>
        <el-button
            :icon="Search"
            style="margin: 0 2px; height: 48px; color: white; font-size: 18px; background-color: hotpink;"
            @click="search_party(search_content)"
        />
      </div>
    </div>
<!--    <div>-->
<!--      {{ party_releases }}-->
<!--    </div>-->
    <el-scrollbar ref="scrollbar_ref" style="z-index: 2;" v-loading="loading">
      <div class="search-body" style="display: flex; flex-wrap: wrap; justify-content: center;">
        <el-card class="party-card" v-for="(p, id) in party_releases" body-style="padding: 12px 8px 8px;" style="margin: 8px; /* width: fit-content */ width: 498px;">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <span style="font-weight: bold; font-size: 18px;">{{ p.title }}</span>
              <span style="color: darkgray;">({{ id }})</span>
            </div>
            <div><span style="color: gray;">{{ p.updater_id }}</span></div>
          </div>
          <!--      <PartyCard :party="{party: p}"></PartyCard>-->
          <PartyCard :party="p"></PartyCard>
          <div style="display: flex; justify-content: space-between;">
            <div/>
            <div>
              <el-button-group style="margin: 0 2px;">
                <!--            <el-button size="default" style="color: deeppink; padding-right: 64px;">-->
                <el-button disabled size="small" style="color: deeppink;">
                  <div style="width: 100%; height: 100%; position: absolute;"></div>
                  <div>❤ 0</div>
                </el-button>
                <el-button disabled size="small">
                  <el-icon><ArrowDownBold /></el-icon>
                </el-button>
              </el-button-group>
              <el-button size="small" type="warning" :data-clipboard-text="JSON.stringify({party: p.party})" :id="'copy-' + p.id" @click="copy_party(p.id)" style="margin: 0 2px;">
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </el-scrollbar>
    <div style="display: flex; justify-content: center; padding: 8px 0 0;">
      <el-pagination
          v-model:current-page="current_page"
          background
          layout="prev, pager, next"
          :page-size="6"
          :total="party_count"
          @currentChange="() => {
            get_data(current_page, search_content_applied);
            scrollbar_ref.setScrollTop(0)
          }"
      />
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
// import PartyCard from "@/components/party/PartyCardAnise.vue";
import PartyCard from "@/components/party/PartyCardEliya.vue";
import ClipboardA from 'clipboard'
import {ElMessage} from "element-plus";

const party_releases = ref({})

const party_count = ref(0)
const current_page = ref(1)

const search_content = ref('')
const search_content_applied = ref('')

const scrollbar_ref = ref()
const loading = ref(true)

const placeholders = [
  '哈啾哈啾~',
  '啾啾~',
  '呼呼呼~',
  '呼呼呼~★',
  'はあ——',
  '★ 去帮我买点零食吧—— ★',
  '检索结界，展开。',
  '词条，发送。',
  '8.42614977317635',
  '酥酥真的很甜美的吧ο(=•ω＜=)ρ⌒☆~',
  '哇！你不要点它口牙！',
  '什么？这不是查盘器，这是压缩毛巾，遇到潮气变大辩……',
  '你说得对，但是《弹射世界》是由 Cygames 自主研发的一款全新……',
  'b站关注白鸢别馆谢谢啾~',
  'b站关注芙洛斯Official谢谢啾~',
  '❤ always love you ❤',
  '新作企画中！',
]
const search_placeholder = ref(placeholders[Math.floor(Math.random() * placeholders.length)])

function get_data(page_index, search_content='') {

  const params = {
    page_index: page_index
  }
  if (search_content) params.search_text = search_content
  party_releases.value = {}
  loading.value = true
  axios.post(
      '/api/party_page/',
      {},
      {
        params: params
      }
  ).then(
      r => {
        console.log(r.data)
        party_releases.value = r.data['parties']
        party_count.value = r.data['party_count']
        loading.value = false
      }
  )
}

function search_party(search_content) {
  search_content_applied.value = search_content
  get_data(current_page.value, search_content_applied.value)
}

function copy_party(id_) {
  const cb = new ClipboardA('#copy-' + id_)
  cb.on('success', e => {
    ElMessage.success('复制成功')
    cb.destroy()
  })
}

export default {
  name: "PartySearcher",
  components: {PartyCard},
  data(){
    return {
      party_releases: party_releases,
      party_count: party_count,
      current_page: current_page,
      search_content: search_content,
      search_placeholder: search_placeholder,
      scrollbar_ref: scrollbar_ref,
      loading: loading
    }
  },
  methods: {
    get_data,
    search_party,
    copy_party
  },
  mounted() {
    const query = this.$route['query']
    console.log(query)
    if (query.hasOwnProperty('q')) {
      search_content.value = query.q
      search_content_applied.value = search_content.value
    }
    get_data(current_page.value, search_content_applied.value)
  }
}
</script>

<style scoped>
.party-card:hover{
  box-shadow: 0 0 8px;
}
</style>