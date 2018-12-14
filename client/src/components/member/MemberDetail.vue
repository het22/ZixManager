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
        <a class="button is-primary" v-on:click="modifybuttonTapped">
          <span class="icon"><i class="fas fa-edit"></i></span>
          <span>수정</span>
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
          <span class="content">{{constants.EMPTY_ORDERTABLE_MESSAGE}}</span>
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
  props: ['member_id'],
  data() {
    return {
      detail: {},
      orders: [],
      constants: require('../constants.js')
    }
  },
  created() {
    this.fetchMemberDetailData();
  },
  methods: {
    fetchMemberDetailData() {
      console.log('member detail infor requested');
      const id = this.member_id;
      this.$http.get(`/article/member/${id}`)
        .then((res) => {
          const data = res.data;
          this.detail = data[0];
          console.log('member detail infor loaded');
        })
    },
    backButtonTapped() {
      this.$router.go(-1);
    },
    modifybuttonTapped() {
      this.flash('수정한 내용 전송 중...', 'warning', {
        timeout: constants.flash_timeout
      })
      const id = this.member_id;
      this.$http.post(`/article/member/modify/${id}`, this.detail)
        .then((res) => {
          const success = res.data;
          setTimeout(() => {
            if (success) {
              this.flash('수정 완료', 'success', {
                timeout: constants.flash_timeout
              })
            } else {
              this.flash('수정 실패', 'error', {
                timeout: constants.flash_timeout
              })
            }
          }, constants.flash_delay);
        })
    },
    deleteButtonTapped() {
      this.flash('삭제 요청 중...', 'warning', {
        timeout: constants.flash_timeout
      })
      const id = this.member_id;
      this.$http.post(`/article/member/delete/${id}`)
        .then((res) => {
          const success = res.data;
          setTimeout(() => {
            if (success) {
              this.flash('삭제 완료', 'success', {
                timeout: constants.flash_timeout
              })
              this.$router.go(-1);
            } else {
              this.flash('삭제 실패', 'error', {
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
