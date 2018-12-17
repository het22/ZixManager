<template lang="html">
<div class="order-new-wrapper">
  <!-- 내부 네비게이션 바 -->
  <nav class="level">
    <div class="level-left">
      <p class="level-item">
        <a class="button" v-on:click="backButtonTapped">
          <span class="icon"><i class="fas fa-angle-left"></i></span>
          <span>뒤로</span>
        </a>
      </p>
    </div>
  </nav>
  <div class="columns">
    <!-- 개인정보 컬럼 -->
    <div class="column is-6">
      <div class="box">
        <div class="title">
          신규주문
        </div>
        <!-- 입력 폼 -->
        <!-- 등록 버튼 -->
        <div class="box-footer">
          <a class="button is-primary" v-on:click="registerbuttonTapped">
            <span class="icon"><i class="fas fa-edit"></i></span>
            <span>등록</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import inputForm from '../forms/input-form.vue'
import textForm from '../forms/text-form.vue'
import dateForm from '../forms/date-form.vue'
let constants = require('../../constants.js')
export default {
  components: {
    inputForm,
    textForm,
    dateForm
  },
  data() {
    return {
      detail: {}
    }
  },
  methods: {
    backButtonTapped() {
      this.$router.go(-1);
    },
    registerbuttonTapped() {
      this.flash('등록하는 중...', 'warning', {
        timeout: constants.FLASH_TIMEOUT
      })
      console.log('new order register requested');
      // this.$http.post(`/article/member/register`, this.detail)
      //   .then((res) => {
      //     const success = res.data;
      //     setTimeout(() => {
      //       if (success) {
      //         this.flash('등록 완료', 'success', {
      //           timeout: constants.FLASH_TIMEOUT
      //         })
      //         this.$router.go(-1);
      //       } else {
      //         this.flash('등록 실패', 'error', {
      //           timeout: constants.FLASH_TIMEOUT
      //         })
      //       }
      //     }, constants.FLASH_DELAY);
      //   })
    }
  }
}
</script>

<style lang="css">
.order-new-wrapper {
  margin: 20px;
  margin-left: 10px;
}

.order-new-wrapper .single {
  margin: 20px;
  margin-left: 10px;
}
.order-new-wrapper .single .title{
  font-size: 20px;
  font-weight: 500;
}
.order-new-wrapper .box .box-footer {
  margin-top: 20px;
  font-weight: bold;
  text-align: right;
}
</style>
