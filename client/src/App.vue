<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.fetchWallpaperOptions();
    this.fetchPlateOptions();
    this.fetchCost();
  },
  methods: {
    fetchWallpaperOptions() {
       this.$http.get(`/article/cost/wlp`)
        .then((res) => {
          const data = res.data;
          var options = [];
          data.forEach((row) => {
            options.push({name: row.wlp_name, value: row.wlp_id});
          })
          this.$constant.OPTIONS.WLP = options;
        })
    },
    fetchPlateOptions() {
      this.$http.get(`/article/cost/plt`)
        .then((res) => {
          const data = res.data;
          var options = [];
          data.forEach((row) => {
            options.push({name: row.plt_name, value: row.plt_id});
          })
          this.$constant.OPTIONS.PLT = options;
        })
    },
    fetchCost() {
      this.$http.get(`/article/cost`)
        .then((res) => {
          this.$constant.COST = res.data;
        })
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
