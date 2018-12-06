<template lang="html">
<nav class="navbar has-shadow">
  <div class="container" style="height: inherited">
    <div class="navbar-brand">
      <router-link to="/">
        <a class="navbar-item">
          <span class="icon">
            <i class="fab fa-fort-awesome-alt fa-2x"></i>
          </span>
          <span class="title">
            ZIX
          </span>
          <span class="subtitle">
            manager
          </span>
        </a>
      </router-link>
    </div>
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
  margin-right: 15px;
  margin-bottom: 3px;
}

.navbar-item .title {
  color: #FFFFFF;
  margin-bottom: 0;
}

.navbar-item .subtitle {
  color: #FFFFFF;
  font-weight: bold;
}
</style>
