<script setup>
import UnitWikiCardBody from '@/components/party/components/UnitWikiCardBody.vue'
// import {unit_data} from "@/components/party_manager";
// import axios from "axios";
// import {onMounted, ref} from "vue";

</script>
<template>
<div style="width: 100%; margin: 0 auto;">
<!--  aba{{ unit }}-->
  <UnitWikiCardBody v-if="unit" :unit="unit"></UnitWikiCardBody>
</div>
</template>
<script>
import axios from "axios";
import {ref} from "vue";

const unit = ref()
export default {
  data() {
    return {
      unit: unit
    }
  },
  mounted() {
      const query = this.$route['query']
      console.log(query)
      // if (query.hasOwnProperty('a')) {
      //   search_content.value = query.q
      //   search_content_applied.value = search_content.value
      // }
      // if (query.hasOwnProperty('page') && parseInt(query.page) > 0) {
      //   current_page.value = parseInt(query.page)
      // }

      axios.post(
          '/api/select_data/' + query.source + '/unit/',
          {},
          {
            params: {
              anise_id: query.anise_id
            }
          }
      ).then(r => {
        unit.value = r.data.data
        // Object.assign(unit.value, an)
      })
  }
}
</script>
