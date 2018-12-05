<template lang="html">
<div class="customer-wrapper">
  <!-- search bar -->
  <div class="field has-addons">
    <div class="control">
      <input class="input" name="customer_name" placeholder="Enter Customer Name" v-model="keyword" v-on:keyup.enter="search" v-on:keyup="keyword_changed">
    </div>
    <div class="control">
      <div class="button" v-on:click="search">
        Search
      </div>
    </div>
  </div>
  <!-- table -->
  <table class="table is-hoverable">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Remarks</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="customer in customers" :key="customer.id">
        <td>{{customer.id}}</td>
        <td>{{customer.name}}</td>
        <td>{{customer.phone}}</td>
        <td>{{customer.address_customer}}</td>
        <td>-</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      customers: []
    }
  },
  methods: {
    search() {
      console.log('search button clicked.');
    },
    keyword_changed() {
      console.log(this.keyword);
    },
    request_customer_all() {
      console.log('customer infor requested');
      this.$http.get('/article/customer')
        .then((res) => {
          const data = res.data;
          this.customers = data;
          console.log('customer infor loaded');
        })
    }
  },
  beforeMount() {
    this.request_customer_all()
  }
}
</script>

<style lang="css">
.customer-wrapper {
  margin: 20px;
  margin-left: 10px;
}

.input {
  width: 300px;
}

.button {
  background-color: #00D1B3;
  border-color: #00D1B3;
  color: #FFFFFF;
  font-weight: 600;
}
</style>
