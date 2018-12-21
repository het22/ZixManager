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
        <linkForm title="주문회원" :value="detail.mem_username+` (${detail.mem_userid})`" :mem_id="detail.mem_id"></linkForm>
        <inputForm title="주문번호" :value="detail.ord_id" disabled="true" essential="true"></inputForm>
        <dateForm title="상담일" :value.sync="detail.ord_date_consult"></dateForm>
        <dateForm title="시공일" :value.sync="detail.ord_date_construct"></dateForm>
        <inputForm title="샘플주소" :value.sync="detail.ord_adr_sample"></inputForm>
        <inputForm title="시공주소" :value.sync="detail.ord_adr_construct"></inputForm>
        <textForm title="비고" :value.sync="detail.ord_remarks"></textForm>
      </div>
    </div>
    <!-- 시공내용 컬럼 -->
    <div class="column is-4">
      <div class="box">
        <div class="title">시공내용</div>
        <areaForm title="평형" :value.sync="detail.ord_spl_area"></areaForm>
        <selectForm title="방개수" :value.sync="detail.ord_room_count" :options="room_count_options"></selectForm>
        <selectForm title="벽지종류" :value.sync="detail.wlp_id" :options="wlp_options"></selectForm>
        <radioForm title="벽지개수" :value.sync="detail.ord_wlp_count" :options="wlp_count_options"></radioForm>
        <selectForm title="장판종류" :value.sync="detail.plt_id" :options="plt_options"></selectForm>
        <radioForm title="걸레받이" :value.sync="detail.ord_baseboard" :options="baseboard_options"></radioForm>
        <optionForm title="베란다확장" :value.sync="detail.ord_veranda"></optionForm>
        <optionForm title="복층옵션" :value.sync="detail.ord_duplex"></optionForm>
        <optionForm title="가구있음" :value.sync="detail.ord_occupied"></optionForm>
      </div>
    </div>
    <!-- 예상가격 컬럼 -->
    <div class="column">
      <div class="box">
        <div class="title">예상가격</div>
        <inputForm title="입력가격" :value.sync="detail.ord_price"></inputForm>
        <inputForm title="공급가격" :value="detail.ord_rtl_price" disabled="true"></inputForm>
        <inputForm title="소비자가격" :value="detail.ord_spl_price" disabled="true"></inputForm>
        <inputForm title="계약금" :value="detail.ord_down_price" disabled="true"></inputForm>
        <optionForm title="결제여부" :value.sync="detail.ord_paid"></optionForm>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import inputForm from '../forms/input-form.vue'
import textForm from '../forms/text-form.vue'
import dateForm from '../forms/date-form.vue'
import linkForm from '../forms/link-form.vue'
import areaForm from '../forms/area-form.vue'
import selectForm from '../forms/select-form.vue'
import radioForm from '../forms/radio-form.vue'
import optionForm from '../forms/option-form.vue'
let constants = require('../../constants.js')
export default {
  components: {
    inputForm,
    textForm,
    dateForm,
    linkForm,
    areaForm,
    selectForm,
    radioForm,
    optionForm
  },
  props: ['order_id'],
  data() {
    return {
      constants: constants,
      detail: {},
      price: {},
      wlp_options: [],
      plt_options: [],
      room_count_options: [
        {name: '1개', value: 1},
        {name: '2개', value: 2},
        {name: '3개', value: 3},
        {name: '4개', value: 4},
        {name: '5개', value: 5},
      ],
      wlp_count_options: [
        {name: '1개', value: 1},
        {name: '2개', value: 2},
        {name: '3개', value: 3}
      ],
      baseboard_options: [
        {name: '집전체', value: 1},
        {name: '방만', value: 2}
      ]
    }
  },
  created() {
    this.fetchOrderDetailData();
    this.fetchWallpaperOptions();
    this.fetchPlateOptions();
  },
  methods: {
    fetchOrderDetailData() {
      console.log('member detail infor requested');
      const id = this.order_id;
      this.$http.get(`/article/order/${id}`)
        .then((res) => {
          const data = res.data;
          if (!data) {
            this.$router.replace({name: 'NotFound'})
          }
          this.detail = data[0];
          console.log('member detail infor loaded');
        })
    },
    fetchWallpaperOptions() {
      this.$http.get(`/article/cost/wallpaper`)
        .then((res) => {
          const data = res.data;
          data.forEach((row) => {
            this.wlp_options.push({name: row.wlp_name, value: row.wlp_id});
          })
        })
    },
    fetchPlateOptions() {
      this.$http.get(`/article/cost/plate`)
        .then((res) => {
          const data = res.data;
          data.forEach((row) => {
            this.plt_options.push({name: row.plt_name, value: row.plt_id});
          })
        })
    },
    backButtonTapped() {
      this.$router.go(-1);
    },
    saveButtonTapped() {
      console.log(this.detail);
      this.flash('수정한 내용 전송 중...', 'warning', {
        timeout: this.constants.FLASH_TIMEOUT
      })
      const id = this.order_id;
      this.$http.post(`/article/order/modify/${id}`, this.detail)
        .then((res) => {
          const success = res.data;
          setTimeout(() => {
            if (success) {
              this.flash('수정 완료', 'success', {
                timeout: this.constants.FLASH_TIMEOUT
              })
            } else {
              this.flash('수정 실패', 'error', {
                timeout: this.constants.FLASH_TIMEOUT
              })
            }
          }, this.constants.FLASH_DELAY);
        })
    },
    deleteButtonTapped() {
      this.flash('삭제 요청 중...', 'warning', {
        timeout: this.constants.FLASH_TIMEOUT
      })
      const id = this.order_id;
      this.$http.post(`/article/order/delete/${id}`)
        .then((res) => {
          const success = res.data;
          setTimeout(() => {
            if (success) {
              this.flash('삭제 완료', 'success', {
                timeout: this.constants.FLASH_TIMEOUT
              })
              this.$router.go(-1);
            } else {
              this.flash('삭제 실패', 'error', {
                timeout: this.constants.FLASH_TIMEOUT
              })
            }
          }, this.constants.FLASH_DELAY);
        })
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
