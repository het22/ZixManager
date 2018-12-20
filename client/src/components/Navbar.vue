<template lang="html">
<nav class="navbar has-shadow">
  <div class="navbar-brand">
    <router-link to="/">
      <a class="navbar-item">
        <span class="icon"><i class="far fa-snowflake fa-2x"></i></span>
        <span class="title">ZIX</span>
        <span class="subtitle">manager</span>
      </a>
    </router-link>
  </div>
</nav>
</template>

<script>
export default {}
</script>

<style lang="css">
.navbar {
  background-color: #363636;
  color: #FFFFFF;
}

.navbar-item .icon {
  color: #FFFFFF;
  margin-bottom: 3px;
  margin-right: 15px;
}

.navbar-item .title {
  color: #FFFFFF;
  margin-bottom: 0;
}

.navbar-item .subtitle {
  color: #FFFFFF;
  font-weight: bold;
  padding: 5px 0px 0px 0px;
}
</style>
