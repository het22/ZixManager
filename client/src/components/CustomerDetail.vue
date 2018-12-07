<template lang="html">
<div class="customer-detail-wrapper">
  {{detail}}
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
          this.detail = data;
          console.log('customer detail infor loaded');
        })
    }
  }
}
</script>

<style lang="css">
.customer-detail-wrapper {

}
</style>
