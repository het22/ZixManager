<template lang="html">
<div class="order-new-wrapper">
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
        <a class="button is-primary" v-on:click="registerbuttonTapped">
          <span class="icon"><i class="fas fa-edit"></i></span>
          <span>등록</span>
        </a>
      </p>
    </div>
  </nav>

  <div class="columns">

    <!-- 시공정보 컬럼 -->
    <div class="column is-4">
      <div class="box">
        <div class="title">시공정보</div>
        <inputForm title="회원번호" :value.sync="detail.mem_id" essential="true"></inputForm>
        <dateForm title="상담일" :value.sync="detail.ord_date_consult"></dateForm>
        <dateForm title="시공일" :value.sync="detail.ord_date_construct"></dateForm>
        <inputForm title="샘플주소" :value.sync="detail.ord_adr_sample"></inputForm>
        <inputForm title="시공주소" :value.sync="detail.ord_adr_construct"></inputForm>
        <textForm title="비고" :value.sync="detail.ord_remarks"></textForm>
      </div>
    </div>

    <!-- 시공내용 컬럼 -->
    <div class="column is-4" v-on:change="setPrice">
      <div class="box">
        <div class="title">시공내용</div>
        <radioForm title="단위" :value.sync="detail.ord_area_isspl" :options="this.$constant.OPTIONS.AREA_METHOD"></radioForm>
        <selectForm title="평형" :value.sync="detail.ord_area" :options="((detail.ord_area_isspl||0)==0) ? this.$constant.OPTIONS.SPL_RANGE : this.$constant.OPTIONS.RTL_RANGE"></selectForm>
        <selectForm title="방개수" :value.sync="detail.ord_room_count" :options="this.$constant.OPTIONS.ROOM_COUNT"></selectForm>
        <optionForm title="베란다확장" :value.sync="detail.ord_opt_veranda"></optionForm>
        <optionForm title="천장시공" :value.sync="detail.ord_opt_ceiling"></optionForm>
        <optionForm title="올 화이트 패키지" :value.sync="detail.ord_opt_whitepack"></optionForm>
        <hr>
        <selectForm title="벽지종류" :value.sync="detail.wlp_id" :options="this.$constant.OPTIONS.WLP"></selectForm>
        <radioForm title="벽지개수" :value.sync="detail.ord_wlp_count" :options="this.$constant.OPTIONS.WLP_COUNT"></radioForm>
        <hr>
        <selectForm title="장판종류" :value.sync="detail.plt_id" :options="this.$constant.OPTIONS.PLT"></selectForm>
        <radioForm title="시공범위" :value.sync="detail.ord_range" :options="this.$constant.OPTIONS.PLT_RANGE"></radioForm>
        <radioForm title="걸레받이" :value.sync="detail.ord_baseboard" :options="this.$constant.OPTIONS.BASEBOARD_RANGE"></radioForm>
        <hr>
        <optionForm title="거주중/가구있음" :value.sync="detail.ord_opt_occupied"></optionForm>
        <optionForm title="시공당일 이사" :value.sync="detail.ord_opt_moveonday"></optionForm>
        <optionForm title="복층형 구조" :value.sync="detail.ord_opt_duplex"></optionForm>
        <optionForm title="우물형 천장" :value.sync="detail.ord_opt_wellshaped"></optionForm>
        <optionForm title="기타 특수환경" :value.sync="detail.ord_opt_special"></optionForm>
      </div>
    </div>

    <!-- 예상가격 컬럼 -->
    <div class="column">
      <div class="box">
        <div class="title">예상가격</div>
        <inputForm title="입력가격" :value.sync="detail.ord_custom_price"></inputForm>
        <inputForm title="공급가격" :value="detail.ord_spl_price" disabled="true"></inputForm>
        <inputForm title="소비자가격" :value="detail.ord_rtl_price" disabled="true"></inputForm>
        <inputForm title="계약금" :value="detail.ord_down_price" disabled="true"></inputForm>
        <optionForm title="결제여부" :value.sync="detail.ord_paid"></optionForm>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import { InputForm, TextForm, DateForm, SelectForm, RadioForm, OptionForm } from '../forms'
export default {
  components: {
    InputForm, TextForm, DateForm, SelectForm, RadioForm, OptionForm
  },
  data() {
    return {
      detail: {}
    }
  },
  methods: {
    setPrice() {
      const cal = require('../../util/calculate.js')
      this.detail.ord_spl_price = cal.splPrice(this.detail);
      this.detail.ord_rtl_price = cal.rtlPrice(this.detail);
      this.detail.ord_down_price = cal.downPrice(this.detail);
    },
    backButtonTapped() {
      this.$router.go(-1);
    },
    registerbuttonTapped() {
      this.flash(this.$constant.MESSAGE.ORDER.REGISTER.START, 'warning', {
        timeout: this.$constant.FLASH_TIMEOUT
      })
      this.$http.post(`/article/order/register`, this.detail)
        .then((res) => {
          const success = res.data;
          setTimeout(() => {
            if (success) {
              this.flash(this.$constant.MESSAGE.ORDER.REGISTER.SUCCESS, 'success', {
                timeout: this.$constant.FLASH_TIMEOUT
              })
              this.$router.go(-1);
            } else {
              this.flash(this.$constant.MESSAGE.ORDER.REGISTER.FAIL, 'error', {
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
.order-new-wrapper {
  margin: 20px;
  margin-left: 10px;
}
.order-new-wrapper .single {
  margin: 20px;
  margin-left: 10px;
}
.order-new-wrapper .single .title{
  font-size: 20px;
  font-weight: 500;
}
.order-new-wrapper .box .box-footer {
  margin-top: 20px;
  font-weight: bold;
  text-align: right;
}
</style>
