<template lang="html">
<div>
  <!-- navigation bar(always top) -->
  <Navbar/>
  <div class="title is-fullheight">
    <i class="fas fa-exclamation-triangle"></i>
    발견되지 않은 페이지에요..
  </div>
</div>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="css">
.title.is-fullheight {
  text-align: center;
  height: 200px;
  line-height: 200px;
}
</style>
