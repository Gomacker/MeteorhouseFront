<template>
<div class="party" style="display: flex;">
  <div class="union">
    <div class="wfo-slot main">
      <img :src="blank" alt="">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "PartyCardEliya",
  data() {
    return {
      blank: '/api/static/worldflipper/unit/blank.png'
    }
  }
}
</script>

<style scoped>

</style>