<template>
<div>
  <!-- navigation bar(always top) -->
  <nav class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="../">
          <h1 class="title" style="margin:0;">ZIX</h1>
          <h1 class="subtitle">manager</h1>
        </a>
      </div>
    </div>
  </nav>
  <!-- hero section(search bar included) -->
  <section class="hero is-fullheight header-image">
    <div class="hero-head">
      <!-- head -->
    </div>
    <div class="hero-body">
      <!-- body -->
    </div>
    <div class="hero-foot">
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
          <div class="box">
            <div class="field is-grouped">
              <!-- 검색어 입력필드 -->
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="Enter client name" v-model="keyword" v-on:keyup.enter="search" v-on:keydown="hide_newButton">
              </p>
              <!-- 신규버튼(조건부 활성, 애니메이션) -->
              <transition name="fade">
                <p class="control" v-if="newButton_isActive">
                  <a class="button is-primary" @click="modal_isActive=true">
                    Add New?
                  </a>
                </p>
              </transition>
              <!-- 검색버튼 -->
              <p class="control">
                <a class="button is-info" v-on:click="search">
                  Search
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- modal(client infor) -->
  <modal v-show="modal_isActive" v-on:close="modal_isActive=false"></modal>
</div>
</template>

<script>
import modal from './ClientInforModal.vue';
export default {
  components: {
    modal
  },
  data() {
    return {
      keyword: '',
      newButton_isActive: false,
      modal_isActive: false
    }
  },
  methods: {
    search() {
      const keyword = this.keyword;
      console.log("vue: search called(keyword:" + keyword + ")");
      this.$http.get('/article/client', {
          params: {
            name: keyword
          }
        })
        .then((res) => {
          const data = res.data;
          console.log('vue: received data.')
          console.log(data);
          if (data == false) {
            this.newButton_isActive = true;
          } else {
            this.modal_isActive = true;
          }
        })
    },
    hide_newButton() {
      this.newButton_isActive = false;
    }
  }
}
</script>

<style>
.header-image {
  background-image: url('https://source.unsplash.com/featured/?sanfrancisco');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #ffffff;
}

.navbar {
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.7);
}

.box {
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
