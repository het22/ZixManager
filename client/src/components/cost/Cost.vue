<template lang="html">
<div class="cost-wrapper">
  <!-- 내부 네비게이션 바 -->
  <nav class="level">
    <div class="level-left" style="font-size: 15px;">
      <p class="level-item">
        <div style="color:#ff3860; font-weight:bold; width: 100px">■ 공급가</div>
      </p>
      <p class="level-item">
        <div style="color:#00D1B3; font-weight:bold; width: 100px">■ 소비자가</div>
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
          :rtl_cost.sync="cost.rtl_cost"
          :spl_cost.sync="cost.spl_cost"></costForm>
        </div>
      </div>
    </div>
    <div class="column is-4">
      <div class="box">
        <div class="title">장판</div>
        <div v-for="cost in plate_cost">
          <costForm
          :title="cost.plt_name"
          :rtl_cost.sync="cost.rtl_cost"
          :spl_cost.sync="cost.spl_cost"></costForm>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="box">
        <div class="title">기타</div>
        <div v-for="cost in labor_cost">
          <costForm
          :title="cost.lab_name"
          :rtl_cost.sync="cost.rtl_cost"
          :spl_cost.sync="cost.spl_cost"></costForm>
        </div>
        <div v-for="cost in subsidary_cost">
          <costForm
          :title="cost.sbd_name"
          :rtl_cost.sync="cost.rtl_cost"
          :spl_cost.sync="cost.spl_cost"></costForm>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import costForm from '../forms/cost-form.vue'
import constants from '../../constants.js'
export default {
  components: {
    costForm
  },
  data() {
    return {
      wallpaper_cost: [],
      plate_cost: [],
      labor_cost: [],
      subsidary_cost: []
    }
  },
  created() {
    this.fetchMemberDetailData();
  },
  methods: {
    fetchMemberDetailData() {
      console.log('cost infor requested');
      const id = this.member_id;
      const costs = ['wallpaper', 'plate', 'labor', 'subsidary'];
      costs.forEach((cost) => {
        this.$http.get(`/article/cost/${cost}`)
          .then((res) => {
            const data = res.data;
            this[cost+'_cost'] = data;
            console.log(`${cost} infor loaded`);
          })
      });
    },
    savebuttonTapped() {
      this.flash('수정한 내용 전송 중...', 'warning', {
        timeout: constants.FLASH_TIMEOUT
      })
      const costs = ['wallpaper', 'plate', 'labor', 'subsidary'];
      costs.forEach((cost) => {
        this.$http.post(`/article/cost/${cost}/save`, this[cost+'_cost'])
          .then((res) => {
            const success = res.data;
            setTimeout(() => {
              if (success) {
                this.flash(constants.MESSAGE_SUCCESS.MODIFY[cost+'_cost'], 'success', {
                  timeout: constants.FLASH_TIMEOUT
                })
              } else {
                this.flash(constants.MESSAGE_FAIL.MODIFY[cost+'_cost'], 'error', {
                  timeout: constants.FLASH_TIMEOUT
                })
              }
            }, constants.FLASH_DELAY);
          })
      });
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
