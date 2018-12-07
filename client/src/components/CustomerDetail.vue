<template lang="html">
<div class="customer-detail-wrapper">
  <div class="title">
    회원정보
  </div>
  <div class="single">
    <div class="title">
      ID : {{detail.id}}
    </div>
  </div>
  <div class="single">
    <div class="title">
      이름 : {{detail.name}}
    </div>
  </div>
  <div class="single">
    <div class="title">
      연락처 : {{detail.phone}}
    </div>
  </div>
  <div class="single">
    <div class="title">
      자택주소 : {{detail.address_customer}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['customer_id'],
  data() {
    return {
      detail: []
    }
  },
  created() {
    this.fetchCustomerDetailData();
  },
  methods: {
    fetchCustomerDetailData() {
      console.log('customer detail infor requested');
      const id = this.customer_id;
      this.$http.get('/article/customer/'+id)
        .then((res) => {
          const data = res.data;
          this.detail = data[0];
          console.log('customer detail infor loaded');
        })
    }
  }
}
</script>

<style lang="css">
.customer-detail-wrapper {
  margin: 20px;
  margin-left: 10px;
}
.customer-detail-wrapper .title {
  font-size: 30px;
  font-weight: bold;
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
