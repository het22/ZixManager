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
  <!-- columns -->
  <section class="columns">
    <!-- sidemenu -->
    <div class="column is-2 sidemenu hero is-fullheight">
      <div class="menus">
        <!-- General -->
        <p class="menu-label">
          General
        </p>
        <router-link to="/">
          <a class="item" v-bind:class="{active : isActive}">
            <span class="icon">
              <i class="fas fa-file-alt"></i>
            </span>
            <span class="name">
              Main
            </span>
          </a>
        </router-link>
      </div>
      <!-- Menu -->
      <div class="menus">
        <p class="menu-label">
          Menu
        </p>
        <router-link to="/Customer">
          <a class="item">
            <span class="icon">
              <i class="fas fa-user"></i>
            </span>
            <span class="name">
              Customer
            </span>
          </a>
        </router-link>
        <a class="item">
          <span class="icon">
            <i class="fas fa-coins"></i>
          </span>
          <span class="name">
            Cost
          </span>
        </a>
        <a class="item">
          <span class="icon">
            <i class="fas fa-bell"></i>
          </span>
          <span class="name">
            Notification
          </span>
        </a>
      </div>
    </div>
    <!-- content -->
    <div class="column content hero is-fullheight">
      <Customer/>
    </div>
  </section>
</div>
</template>

<script>
import Customer from './Customer.vue'
export default {
  components: {
    Customer
  },
  data() {
    return {
      isActive: true
    }
  }
}
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

.sidemenu {
  background-color: #363636;
  padding-right: 0px;
  display: block;
}

.sidemenu .menus {

}

.sidemenu .menus .menu-label {
  text-align: left;
  margin: 10px;
  color: #00D1B3;
  font-weight: 500;
  font-size: 12px;
}

.sidemenu .menus .item {
  display: block;
  padding: 5px;
  padding-left: 12px;
  text-align: left;
  font-weight: 600;
  font-size: 17px;
  margin: 4px;
  color: #afb8c3;
}

.sidemenu .menus .item.active {
  background-color: #00D1B3;
  border-radius: 4px;
  color: #FFFFFF;
}

.sidemenu .menus .item.active:hover {
  background-color: #00D1B3;
  border-radius: 4px;
  color: #FFFFFF;
}

.sidemenu .menus .item:hover {
  background-color: #FFFFFF;
  border-radius: 4px;
  color: #363636;
}

.content {
  background-color: #FFFFFF;
}
</style>
