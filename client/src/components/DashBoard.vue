<template lang="html">
<div class="dashboard">
  <!-- Navigation bar -->
  <navbar/>
  <!-- Contents -->
  <section class="columns contents">
    <aside class="column is-2 sidemenu is-fullheight">
      <div class="menus">
        <p class="section">General</p>
        <router-link :to="{name: 'Home'}">
          <a class="item" v-bind:class="{active: this.$route.name.match('Home')}">
            <span class="icon"><i class="fas fa-home"></i></span>
            <span class="name">Home</span>
          </a>
        </router-link>
      </div>
      <div class="menus">
        <p class="section">Menu</p>
        <router-link :to="{name: 'MemberTable'}">
          <a class="item" v-bind:class="{active: this.$route.name.match('Member')}">
            <span class="icon"><i class="fas fa-user"></i></span>
            <span class="name">Member</span>
          </a>
        </router-link>
        <router-link :to="{name: 'OrderTable'}">
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
    </aside>
    <div class="column">
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
.dashboard {
  height: inherit;
}

.contents {
  height: inherit;
}

.sidemenu {
  background-color: #363636;
  padding-right: 0px;
}

.sidemenu .menus .section {
  text-align: left;
  margin: 4px;
  padding: 6px;
  color: #00D1B3;
  font-weight: 500;
  font-size: 14px;
}

.sidemenu .menus .item {
  display: block;
  margin: 4px;
  padding: 5px 5px 5px 12px;
  text-align: left;
  font-weight: 600;
  font-size: 18px;
  color: #bbbbbb;
  border-radius: 2px;
}

.sidemenu .menus .item:hover {
  background-color: #FFFFFF;
  color: #363636;
}

.sidemenu .menus .item.active {
  background-color: #00D1B3;
  color: #FFFFFF;
}

.sidemenu .menus .item.active:hover {
  background-color: #00D1B3;
  color: #FFFFFF;
}

/* 플래시 메세지 */
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

/* form commons */
.common-form {
  margin-left: 10px;
  margin-bottom: 10px;
}

.common-form .title {
  font-size: 15px;
  font-weight: 400;
}
</style>
