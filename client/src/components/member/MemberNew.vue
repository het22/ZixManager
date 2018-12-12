<template lang="html">
<div class="member-new-wrapper">
  <!-- 내부 네비게이션 바 -->
  <nav class="level">
    <div class="level-left">
      <p class="level-item">
        <a class="button" v-on:click="backButtonTapped">
          <span class="icon">
            <i class="fas fa-angle-left"></i>
          </span>
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
            <span class="icon">
              <i class="fas fa-edit"></i>
            </span>
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

export default {
  components: {
    inputForm,
    textForm,
    dateForm
  },
  props: ['member_id'],
  data() {
    return {
      detail: []
    }
  },
  created() {

  },
  methods: {
    fetchMemberDetailData() {
      console.log('member detail infor requested');
      const id = this.member_id;
      this.$http.get('/article/member/' + id)
        .then((res) => {
          const data = res.data;
          this.detail = data[0];
          console.log('member detail infor loaded');
        })
    },
    backButtonTapped() {
      this.$router.go(-1);
    },
    registerbuttonTapped() {
      console.log('registerbuttonTapped');
      // 아이디 중복검사
      if (this.validateUserId('')) {
        this.flash('등록하는 중...', 'warning', {
          timeout: 3000
        })
      } else {
        this.flash('아이디 중복으로 실패', 'error', {
          timeout: 3000
        })
      }
    },
    validateUserId(userid) {
      this.flash('아이디 중복검사 중...', 'warning', {
        timeout: 3000
      })
      return true
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
