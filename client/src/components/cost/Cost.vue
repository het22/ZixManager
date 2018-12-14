<template lang="html">
<div class="cost-wrapper">
  <!-- 내부 네비게이션 바 -->
  <nav class="level">
    <div class="level-left">
      <p class="level-item">
        <div style="color:#00D1B3; font-weight:bold">■ 소비자가</div>
      </p>
      <p class="level-item">
        <div style="color:#ff3860; font-weight:bold">■ 공급가</div>
      </p>
    </div>
    <div class="level-right" style="font-weight: bold;">
      <p class="level-item" style="margin-bottom: 0rem;">
        <a class="button is-primary" v-on:click="savebuttonTapped">
          <span class="icon"><i class="fas fa-edit"></i></span>
          <span>저장</span>
        </a>
      </p>
    </div>
  </nav>
  <!-- contents -->
  <div class="columns">
    <div class="column is-4">
      <div class="box">
        <div class="title">벽지</div>
        <div v-for="cost in wallpaper_cost">
          <costForm
          :title="cost.wlp_name"
          :rtl_cost.sync="cost.wlp_rtl_cost"
          :spl_cost.sync="cost.wlp_spl_cost"></costForm>
        </div>
      </div>
    </div>
    <div class="column is-4">
      <div class="box">
        <div class="title">장판</div>
        <div v-for="cost in plate_cost">
          <costForm
          :title="cost.plt_name"
          :rtl_cost.sync="cost.plt_rtl_cost"
          :spl_cost.sync="cost.plt_spl_cost"></costForm>
        </div>
      </div>
    </div>
    <div class="column is-4">
      <div class="box">
        <div class="title">기타</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import costForm from '../forms/cost-form.vue'
let constants = require('../constants.js')
export default {
  components: {
    costForm
  },
  data() {
    return {
      wallpaper_cost: [],
      plate_cost: []
    }
  },
  created() {
    this.fetchMemberDetailData();
  },
  methods: {
    fetchMemberDetailData() {
      console.log('cost infor requested');
      const id = this.member_id;
      this.$http.get(`/article/cost/wallpaper_cost`)
        .then((res) => {
          const data = res.data;
          this.wallpaper_cost = data;
          console.log('wallpaper_cost infor loaded');
        })
      this.$http.get(`/article/cost/plate_cost`)
        .then((res) => {
          const data = res.data;
          this.plate_cost = data;
          console.log('plate_cost infor loaded');
        })
    },
    savebuttonTapped() {
      this.flash('수정한 내용 전송 중...', 'warning', {
        timeout: constants.flash_timeout
      })
      this.$http.post(`/article/cost/wallpaper_cost/save`, this.wallpaper_cost)
        .then((res) => {
          const success = res.data;
          setTimeout(() => {
            if (success) {
              this.flash('벽지 비용 수정 완료', 'success', {
                timeout: constants.flash_timeout
              })
            } else {
              this.flash('벽지 비용 수정 실패', 'error', {
                timeout: constants.flash_timeout
              })
            }
          }, constants.flash_delay);
        })
      this.$http.post(`/article/cost/plate_cost/save`, this.plate_cost)
        .then((res) => {
          const success = res.data;
          setTimeout(() => {
            if (success) {
              this.flash('장판 비용 수정 완료', 'success', {
                timeout: constants.flash_timeout
              })
            } else {
              this.flash('장판 비용 수정 실패', 'error', {
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
.cost-wrapper {
  margin: 20px;
  margin-left: 10px;
}
</style>
