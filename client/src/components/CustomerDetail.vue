<template lang="html">
<div class="member-detail-wrapper">
  <nav class="level">
    <div class="level-left">
      <p class="level-item">
        <a class="button">
          <span class="icon">
            <i class="fas fa-angle-left"></i>
          </span>
          <span>뒤로</span>
        </a>
      </p>
    </div>
    <div class="level-right" style="font-weight: bold;">
      <p class="level-item" style="margin-bottom: 0rem;">
        <a class="button is-primary">
          <span class="icon">
            <i class="fas fa-edit"></i>
          </span>
          <span>수정</span>
        </a>
      </p>
      <p class="level-item">
        <a class="button is-danger">
          <span class="icon">
            <i class="fas fa-trash"></i>
          </span>
          <span>삭제</span>
        </a>
      </p>
    </div>
  </nav>
  <div class="columns">
    <div class="column is-6">
      <div class="box">
        <div class="title">
          개인정보
        </div>
        <inputForm title="회원번호" :value.sync="detail.mem_id" disabled="true"></inputForm>
        <inputForm title="이름" :value.sync="detail.mem_username" disabled="true"></inputForm>
        <inputForm title="아이디" :value.sync="detail.mem_userid" disabled="true"></inputForm>
        <inputForm title="이메일" :value.sync="detail.mem_email"></inputForm>
        <inputForm title="연락처" :value.sync="detail.mem_phone"></inputForm>
        <inputForm title="주소" :value.sync="detail.mem_address"></inputForm>
        <dateForm title="생년월일" :value.sync="detail.mem_birthday"></dateForm>
        <textForm title="비고" :value.sync="detail.mem_remarks"></textForm>
      </div>
    </div>
    <div class="column">
      <div class="box">
        <div class="title">
          시공목록
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import inputForm from './forms/input-form.vue'
import textForm from './forms/text-form.vue'
import dateForm from './forms/date-form.vue'
export default {
  components: {
    inputForm,
    textForm,
    dateForm
  },
  props: ['customer_id'],
  data() {
    return {
      detail: []
    }
  },
  created() {
    this.fetchMemberDetailData();
  },
  methods: {
    fetchMemberDetailData() {
      console.log('member detail infor requested');
      const id = this.customer_id;
      this.$http.get('/article/customer/' + id)
        .then((res) => {
          const data = res.data;
          this.detail = data[0];
          console.log('member detail infor loaded');
        })
    },
    backButtonTapped() {
      console.log(this.detail);
    }
  }
}
</script>

<style lang="css">
.member-detail-wrapper {
  margin: 20px;
  margin-left: 10px;
}

.single {
  margin: 20px;
  margin-left: 10px;
}
.single .title{
  font-size: 20px;
  font-weight: 500;
}
</style>
