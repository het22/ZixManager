<template lang="html">
<div class="customer-wrapper">
  <!-- search bar -->
  <div class="field has-addons">
    <div class="control has-icons-left">
      <input class="input" type="text" name="customer_name" placeholder="Enter Customer Name" v-model="keyword" v-on:keyup.enter="search" v-on:input="keyword_changed">
      <span class="icon is-left">
        <i class="fas fa-user"></i>
      </span>
    </div>
    <div class="control">
      <div class="button" v-on:click="search">
        Search
      </div>
    </div>
  </div>
  <!-- table -->
  <table class="table is-hoverable is-striped">
    <thead>
      <tr>
        <th width="8%">ID</th>
        <th width="12%">Name</th>
        <th width="18%">Phone</th>
        <th width="32%">Address</th>
        <th>Remark</th>
      </tr>
    </thead>
    <tbody v-if="customers_show.length!=0">
      <tr v-for="customer in customers_show" :key="customer.id">
        <th>{{customer.id}}</th>
        <td>{{customer.name}}</td>
        <td>{{customer.phone}}</td>
        <td>{{customer.address_customer}}</td>
        <td>{{customer.remark}}</td>
      </tr>
    </tbody>
  </table>
  <div class="empty" v-if="customers_show.length==0">
    <span class="icon">
      <i class="fas fa-table"></i>
    </span>
    <span class="content">
      No Results
    </span>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      customers: [],
      customers_show: []
    }
  },
  methods: {
    search() {
      console.log('search button clicked.');
    },
    keyword_changed(e) {
      this.keyword = e.target.value;
      if (this.keyword=='') {
        this.customers_show = this.customers;
      } else {
        this.customers_show = this.customers.filter(customer => customer.name.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1);
      }
    },
    request_customer_all() {
      console.log('customer infor requested');
      this.$http.get('/article/customer')
        .then((res) => {
          const data = res.data;
          this.customers = data;
          this.keyword_changed({'target':{'value':''}});
          console.log('customer infor loaded');
        })
    }
  },
  beforeMount() {
    this.request_customer_all();
  }
}
</script>

<style lang="css">
.customer-wrapper {
  margin: 20px;
  margin-left: 10px;
}

.control .input {
  width: 300px;
}

.control .button {
  background-color: #00D1B3;
  border-color: #00D1B3;
  color: #FFFFFF;
  font-weight: 600;
}

.control .button:hover {
  border-color: #00D1B3;
  color: lightgrey;
}

.empty {
  font-weight: bold;
  color: grey;
}
</style>
