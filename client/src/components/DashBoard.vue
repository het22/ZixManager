<template lang="html">
<div>
  <!-- navigation bar(always top) -->
  <Navbar/>
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
          <a class="item" v-bind:class="{active : current_content == ''}">
            <span class="icon">
              <i class="fas fa-home"></i>
            </span>
            <span class="name">
              Home
            </span>
          </a>
        </router-link>
      </div>
      <!-- Menu -->
      <div class="menus">
        <p class="menu-label">
          Menu
        </p>
        <router-link to="/menu/customer">
          <a class="item" v-bind:class="{active : current_content == 'customer'}">
            <span class="icon">
              <i class="fas fa-user"></i>
            </span>
            <span class="name">
              Customer
            </span>
          </a>
        </router-link>
        <router-link to="/menu/cost">
          <a class="item" v-bind:class="{active : current_content == 'cost'}">
            <span class="icon">
              <i class="fas fa-coins"></i>
            </span>
            <span class="name">
              Cost
            </span>
          </a>
        </router-link>
        <router-link to="/menu/notification">
          <a class="item" v-bind:class="{active : current_content == 'notification'}">
            <span class="icon">
              <i class="fas fa-bell"></i>
            </span>
            <span class="name">
              Notification
            </span>
          </a>
        </router-link>
      </div>
    </div>
    <!-- content -->
    <div class="column content hero is-fullheight">
      <div v-if="current_content == 'customer'">
        <Customer/>
      </div>
      <div v-else-if="current_content == 'cost'">
        <Cost/>
      </div>
      <div v-else-if="current_content == 'notification'">
        <Notification/>
      </div>
      <div v-else>
        <Home/>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import Navbar from './Navbar.vue'
import Home from './Home.vue'
import Customer from './Customer.vue'
import Cost from './Cost.vue'
import Notification from './Notification.vue'
export default {
  components: {
    Navbar,
    Home,
    Customer,
    Cost,
    Notification
  },
  data() {
    return {
      isActive: true
    }
  },
  computed: {
    current_content() {
      const content = this.$route.params.content_id;
      return (typeof content === 'undefined') ? '' : content;
    }
  }
}
</script>

<style lang="css">
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
