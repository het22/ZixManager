<template lang="html">
<div class="member-new-wrapper">
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
          신규회원
        </div>
        <!-- 입력 폼 -->
        <inputForm title="이름" :value.sync="detail.mem_username"></inputForm>
        <inputForm title="아이디" :value.sync="detail.mem_userid"></inputForm>
        <inputForm title="이메일" :value.sync="detail.mem_email"></inputForm>
        <inputForm title="연락처" :value.sync="detail.mem_phone"></inputForm>
        <inputForm title="주소" :value.sync="detail.mem_address"></inputForm>
        <dateForm title="생년월일" :value.sync="detail.mem_birthday"></dateForm>
        <textForm title="비고" :value.sync="detail.mem_remarks"></textForm>
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
let constants = require('../constants.js')
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
        timeout: constants.flash_timeout
      })
      console.log('new memeber register requested');
      this.$http.post(`/article/member/register`, this.detail)
        .then((res) => {
          const success = res.data;
          setTimeout(() => {
            if (success) {
              this.flash('등록 완료', 'success', {
                timeout: constants.flash_timeout
              })
              this.$router.go(-1);
            } else {
              this.flash('등록 실패', 'error', {
                timeout: constants.flash_timeout
              })
            }
          }, constants.flash_delay);
        })
    }
  }
}
</script>

<style lang="css">
.member-new-wrapper {
  margin: 20px;
  margin-left: 10px;
}

.member-new-wrapper .single {
  margin: 20px;
  margin-left: 10px;
}
.member-new-wrapper .single .title{
  font-size: 20px;
  font-weight: 500;
}
.member-new-wrapper .box .box-footer {
  margin-top: 20px;
  font-weight: bold;
  text-align: right;
}
</style>
