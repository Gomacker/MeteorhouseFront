<script setup>
import ArmamentWikiCardBody from '@/components/party/components/ArmamentWikiCardBody.vue'

</script>
<template>
<div style="padding: 16px; width: fit-content; margin: 0 auto;">
<!--  aba{{ armament }}-->

  <ArmamentWikiCardBody v-if="armament" :armament="armament"></ArmamentWikiCardBody>
</div>
</template>
<script>
import axios from "axios";
import {ref} from "vue";

const armament = ref()
export default {
  data() {
    return {
      armament: armament
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
          '/api/select_data/' + query.source + '/armament/',
          {},
          {
            params: {
              anise_id: query.anise_id
            }
          }
      ).then(r => {
        armament.value = r.data.data
        console.log(r.data)
        // Object.assign(unit.value, an)
      })
  }
}
</script>
