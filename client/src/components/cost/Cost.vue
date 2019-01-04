<template lang="html">
<div class="cost-wrapper">

  <!-- locked screen -->
  <div v-if="locked" class="locked">
    <div class="columns">
      <div class="column is-5">
      </div>
      <div class="column">
        <label for="locked">
          <i class="fas fa-lock"></i>
        </label>
        <input
        class="input"
        type="password"
        id="locked"
        placeholder="Enter Password"
        v-model="passwordInput"
        v-on:keyup.enter="validate"
        autocomplete=off
        style="text-align: center"></input>
      </div>
      <div class="column is-5">
      </div>
    </div>
  </div>

  <!-- unlocked screen -->
  <div v-else>
    <!-- 내부 네비게이션 바 -->
    <nav class="level">
      <div class="level-left" style="font-size: 15px;">
        <p class="level-item">
          <div style="color:#ff3860; font-weight:bold; width: 100px">■ 공급가격</div>
        </p>
        <p class="level-item">
          <div style="color:#00D1B3; font-weight:bold; width: 100px">■ 소비자가격</div>
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
          <div v-for="cost in this.cost.wlp_cost">
            <costForm
            :title="cost.wlp_name"
            :rtl_cost.sync="cost.rtl_cost"
            :spl_cost.sync="cost.spl_cost"></costForm>
          </div>
          <hr>
          <div class="title">부자재비</div>
          <div v-for="cost in this.cost.wlp_cost">
            <costForm
            :title="cost.wlp_name"
            :rtl_cost.sync="cost.sbd_rtl_cost"
            :spl_cost.sync="cost.sbd_spl_cost"></costForm>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="box">
          <div class="title">장판</div>
          <div v-for="cost in this.cost.plt_cost">
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
          <div v-for="cost in this.cost.lab_cost">
            <costForm
            :title="cost.lab_name"
            :rtl_cost.sync="cost.rtl_cost"
            :spl_cost.sync="cost.spl_cost"></costForm>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import {
  CostForm
} from '../forms'
export default {
  components: {
    CostForm
  },
  data() {
    return {
      cost: null,
      locked: true,
      passwordInput: null
    }
  },
  methods: {
    validate() {
      if (this.passwordInput==this.$constant.ADMIN.PASSWORD) {
        this.locked = false;
        this.cost = JSON.parse(JSON.stringify(this.$constant.COST));
      }
    },
    savebuttonTapped() {
      this.flash(this.$constant.MESSAGE.COST.MODIFY.START, 'warning', {
        timeout: this.$constant.FLASH_TIMEOUT
      })
      const costPrefix = ['wlp', 'plt', 'lab'];
      costPrefix.forEach((prefix) => {
        this.$http.post(`/article/cost/${prefix}/save`, this.cost[prefix + '_cost'])
          .then((res) => {
            const success = res.data;
            setTimeout(() => {
              if (success) {
                this.$constant.COST[prefix + '_cost'] = this.cost[prefix + '_cost'];
                this.flash(this.$constant.MESSAGE.COST.MODIFY.SUCCESS, 'success', {
                  timeout: this.$constant.FLASH_TIMEOUT
                })
              } else {
                this.cost[prefix + '_cost'] = this.$constant.COST[prefix + '_cost'];
                this.flash(this.$constant.MESSAGE.COST.MODIFY.FAIL, 'error', {
                  timeout: this.$constant.FLASH_TIMEOUT
                })
              }
            }, this.$constant.FLASH_DELAY);
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
.cost-wrapper .locked {
  text-align: center;
  height: 200px;
  line-height: 200px;
  font-size: 80px;
}
</style>
