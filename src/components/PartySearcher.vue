<template>
  <el-button @click="get_data">
    [debug] 获取数据
  </el-button>
  <el-card v-for="(p, id) in parties" body-style="padding: 16px;">
    <p>
      {{ id }}
    </p>
    <p>
      {{ p }}
    </p>
    <PartyCard :party="{party: p}"></PartyCard>
  </el-card>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import PartyCard from "@/components/party/PartyCardAnise.vue";

const parties = ref({})

export default {
  name: "PartySearcher",
  components: {PartyCard},
  data(){
    return {
      parties: parties
    }
  },
  methods: {
    get_data(){
      axios.get('/api/party_page').then(
          r => {
            console.log(r.data)
            parties.value = r.data['parties']
          }
      )
    }
  }
}
</script>

<style scoped>

</style>