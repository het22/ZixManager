<template lang="html">
<div>
  <!-- navigation bar(always top) -->
  <nav class="navbar has-shadow">
    <div class="container" style="height: inherited">
      <div class="navbar-brand">
        <router-link to="/">
          <a class="navbar-item">
            <span class="icon">
              <i class="fas fa-home fa-lg"></i>
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
  <div class="title is-fullheight">
    <i class="fas fa-exclamation-triangle"></i>
    Page Not Found
  </div>
</div>
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
  margin-right: 10px;
}

.navbar-item .title {
  color: #FFFFFF;
  margin-bottom: 0;
}

.navbar-item .subtitle {
  color: #FFFFFF;
  font-weight: bold;
}

.title.is-fullheight {
  height: 200px;
  line-height: 200px;
}
</style>
