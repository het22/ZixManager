<template lang="html">
<div class="order-detail-wrapper">
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
    <!-- 시공정보 컬럼 -->
    <div class="column is-4">
      <div class="box">
        <div class="title">시공정보</div>
      </div>
    </div>
    <!-- 시공정보 컬럼 -->
    <div class="column is-4">
      <div class="box">
        <div class="title">시공내용</div>
      </div>
    </div>
    <!-- 예상가격 컬럼 -->
    <div class="column">
      <div class="box">
        <div class="title">예상가격</div>

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
  props: ['order_id'],
  data() {
    return {
      detail: {},
      constants: require('../../constants.js')
    }
  },
  created() {
    this.fetchMemberDetailData();
  },
  methods: {
    fetchMemberDetailData() {
      console.log('member detail infor requested');
      // const id = this.member_id;
      // this.$http.get(`/article/member/${id}`)
      //   .then((res) => {
      //     const data = res.data;
      //     if (!data) {
      //       this.$router.replace({name: 'NotFound'})
      //     }
      //     this.detail = data[0];
      //     console.log('member detail infor loaded');
      //   })
    },
    backButtonTapped() {
      this.$router.go(-1);
    },
    saveButtonTapped() {
      this.flash('수정한 내용 전송 중...', 'warning', {
        timeout: this.constants.FLASH_TIMEOUT
      })
      // const id = this.member_id;
      // this.$http.post(`/article/member/modify/${id}`, this.detail)
      //   .then((res) => {
      //     const success = res.data;
      //     setTimeout(() => {
      //       if (success) {
      //         this.flash('수정 완료', 'success', {
      //           timeout: this.constants.FLASH_TIMEOUT
      //         })
      //       } else {
      //         this.flash('수정 실패', 'error', {
      //           timeout: this.constants.FLASH_TIMEOUT
      //         })
      //       }
      //     }, this.constants.FLASH_DELAY);
      //   })
    },
    deleteButtonTapped() {
      this.flash('삭제 요청 중...', 'warning', {
        timeout: this.constants.FLASH_TIMEOUT
      })
      // const id = this.member_id;
      // this.$http.post(`/article/member/delete/${id}`)
      //   .then((res) => {
      //     const success = res.data;
      //     setTimeout(() => {
      //       if (success) {
      //         this.flash('삭제 완료', 'success', {
      //           timeout: this.constants.FLASH_TIMEOUT
      //         })
      //         this.$router.go(-1);
      //       } else {
      //         this.flash('삭제 실패', 'error', {
      //           timeout: this.constants.FLASH_TIMEOUT
      //         })
      //       }
      //     }, this.constants.FLASH_DELAY);
      //   })
    }
  }
}
</script>

<style lang="css">
.order-detail-wrapper {
  margin: 20px;
  margin-left: 10px;
}

.order-detail-wrapper .single {
  margin: 20px;
  margin-left: 10px;
}
.order-detail-wrapper .single .title{
  font-size: 20px;
  font-weight: 500;
}

.order-detail-wrapper .empty {
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  color: grey;
}
</style>
