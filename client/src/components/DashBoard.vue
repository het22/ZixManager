<template lang="html">
<div>
  <!-- Navigation bar -->
  <navbar/>
  <!-- Main container -->
  <section class="columns">
    <!-- Sidemenu -->
    <div class="column is-2 sidemenu hero is-fullheight">
      <!-- General-->
      <div class="menus">
        <p class="menu-label">General</p>
        <router-link :to="{name: 'Home'}">
          <a class="item" v-bind:class="{active: this.$route.name.match('Home')}">
            <span class="icon"><i class="fas fa-home"></i></span>
            <span class="name">Home</span>
          </a>
        </router-link>
      </div>
      <!-- Menu -->
      <div class="menus">
        <p class="menu-label">Menu</p>
        <router-link :to="{name: 'MemberTable'}">
          <a class="item" v-bind:class="{active: this.$route.name.match('Member')}">
            <span class="icon"><i class="fas fa-user"></i></span>
            <span class="name">Member</span>
          </a>
        </router-link>
        <router-link :to="{name: 'Order'}">
          <a class="item" v-bind:class="{active: this.$route.name.match('Order')}">
            <span class="icon"><i class="fas fa-file-alt"></i></span>
            <span class="name">Order</span>
          </a>
        </router-link>
        <router-link :to="{name: 'Cost'}">
          <a class="item" v-bind:class="{active: this.$route.name.match('Cost')}">
            <span class="icon"><i class="fas fa-coins"></i></span>
            <span class="name">Cost</span>
          </a>
        </router-link>
        <router-link :to="{name: 'Notification'}">
          <a class="item" v-bind:class="{active: this.$route.name.match('Notification')}">
            <span class="icon"><i class="fas fa-bell"></i></span>
            <span class="name">Notification</span>
          </a>
        </router-link>
      </div>
    </div>
    <!-- Content -->
    <div class="column content hero is-fullheight">
      <router-view/>
    </div>
  </section>
  <!-- Flash_message -->
  <flash-message transitionName="fade" class="flash-pool"/>
</div>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      isActive: true
    }
  }
}

require('vue-flash-message/dist/vue-flash-message.min.css');
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
  color: #bbbbbb;
}

.sidemenu .menus .item:hover {
  background-color: #FFFFFF;
  border-radius: 4px;
  color: #363636;
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

.content {
  background-color: #FFFFFF;
}

.flash-pool {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 15rem;
  margin: 1rem;
  opacity: 0.8;
}

.fade-move {
  transition: transform .5s;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
