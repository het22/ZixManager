<template lang="html">
<div class="member-detail-wrapper">
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
    <div class="level-right" style="font-weight: bold;">
      <p class="level-item" style="margin-bottom: 0rem;">
        <a class="button is-primary" v-on:click="saveButtonTapped">
          <span class="icon"><i class="fas fa-edit"></i></span>
          <span>저장</span>
        </a>
      </p>
      <p class="level-item">
        <a class="button is-danger" v-on:click="deleteButtonTapped">
          <span class="icon"><i class="fas fa-trash"></i></span>
          <span>삭제</span>
        </a>
      </p>
    </div>
  </nav>

  <div class="columns">

    <!-- 개인정보 컬럼 -->
    <div class="column is-6">
      <div class="box">
        <div class="title">개인정보</div>
        <inputForm title="회원번호" :value="detail.mem_id" disabled="true" essential="true"></inputForm>
        <inputForm title="이름" :value.sync="detail.mem_username" essential="true"></inputForm>
        <inputForm title="아이디" :value.sync="detail.mem_userid"></inputForm>
        <inputForm title="이메일" :value.sync="detail.mem_email"></inputForm>
        <inputForm title="연락처" :value.sync="detail.mem_phone"></inputForm>
        <inputForm title="주소" :value.sync="detail.mem_adr_home"></inputForm>
        <dateForm title="생년월일" :value.sync="detail.mem_birthday"></dateForm>
        <textForm title="비고" :value.sync="detail.mem_remarks"></textForm>
      </div>
    </div>

    <!-- 시공 목록 컬럼 -->
    <div class="column">
      <div class="box">
        <div class="title">시공목록</div>
        <div v-if="orders.length>0">
          <div v-for="order in orders">

          </div>
        </div>
        <div v-else class="empty">
          <span class="icon"><i class="far fa-file-alt"></i></span>
          <span class="content">{{this.$constant.EMPTY_ORDERTABLE_MESSAGE}}</span>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import { InputForm, TextForm, DateForm } from '../forms'
export default {
  components: {
    InputForm, TextForm, DateForm
  },
  props: ['member_id'],
  data() {
    return {
      detail: {},
      orders: []
    }
  },
  created() {
    this.fetchMemberDetailData();
    this.fetchOrdersData();
  },
  methods: {
    fetchMemberDetailData() {
      const id = this.member_id;
      this.$http.get(`/article/member/${id}`)
        .then((res) => {
          const data = res.data;
          if (!data) {
            this.$router.replace({name: 'NotFound'})
          }
          this.detail = data[0];
        })
    },
    fetchOrdersData() {

    },
    backButtonTapped() {
      this.$router.go(-1);
    },
    saveButtonTapped() {
      this.flash(this.$constant.MESSAGE.MEMBER.MODIFY.START, 'warning', {
        timeout: this.$constant.FLASH_TIMEOUT
      })
      const id = this.member_id;
      this.$http.post(`/article/member/modify/${id}`, this.detail)
        .then((res) => {
          const success = res.data;
          setTimeout(() => {
            if (success) {
              this.flash(this.$constant.MESSAGE.MEMBER.MODIFY.SUCCESS, 'success', {
                timeout: this.$constant.FLASH_TIMEOUT
              })
            } else {
              this.flash(this.$constant.MESSAGE.MEMBER.MODIFY.FAIL, 'error', {
                timeout: this.$constant.FLASH_TIMEOUT
              })
            }
          }, this.$constant.FLASH_DELAY);
        })
    },
    deleteButtonTapped() {
      this.flash(this.$constant.MESSAGE.MEMBER.DELETE.START, 'warning', {
        timeout: this.$constant.FLASH_TIMEOUT
      })
      const id = this.member_id;
      this.$http.post(`/article/member/delete/${id}`)
        .then((res) => {
          const success = res.data;
          setTimeout(() => {
            if (success) {
              this.flash(this.$constant.MESSAGE.MEMBER.DELETE.SUCCESS, 'success', {
                timeout: this.$constant.FLASH_TIMEOUT
              })
              this.$router.go(-1);
            } else {
              this.flash(this.$constant.MESSAGE.MEMBER.DELETE.FAIL, 'error', {
                timeout: this.$constant.FLASH_TIMEOUT
              })
            }
          }, this.$constant.FLASH_DELAY);
        })
    }
  }
}
</script>

<style lang="css">
.member-detail-wrapper {
  margin: 20px;
  margin-left: 10px;
}

.member-detail-wrapper .single {
  margin: 20px;
  margin-left: 10px;
}
.member-detail-wrapper .single .title{
  font-size: 20px;
  font-weight: 500;
}

.member-detail-wrapper .empty {
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  color: grey;
}
</style>
