<template lang="html">
<div class="customer-wrapper">
  <!-- search bar -->
  <div class="field has-addons">
    <div class="control has-icons-left">
      <input class="input" type="text" name="customer_name" placeholder="Enter Customer Name" v-model="keyword" v-on:keyup.enter="search" v-on:input="keywordChanged">
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
    <tbody v-if="members.length!=0">
      <tr v-for="member in members" :key="member.mem_id" v-on:click="selectCell(member.mem_id)">
        <th>{{member.mem_id}}</th>
        <td>{{member.mem_username}}</td>
        <td>{{member.mem_phone}}</td>
        <td>{{member.mem_address}}</td>
        <td>{{member.mem_remarks}}</td>
      </tr>
    </tbody>
  </table>
  <!-- empty -->
  <div class="empty" v-if="members.length==0">
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
      members: []
    }
  },
  created() {
    this.fetchCustomerData();
  },
  methods: {
    search() {
      console.log('search button clicked.');
    },
    keywordChanged(e) {
      this.keyword = e.target.value;
    },
    fetchCustomerData() {
      console.log('customer infor requested');
      this.$http.get('/article/customer')
        .then((res) => {
          const data = res.data;
          if (!data) {
            console.log('customer infor load failed');
            return
          } else {
            this.members = data;
            console.log('customer infor loaded('+data.length+' rows)');
          }
        })
    },
    selectCell(id) {
      this.$router.push({
        name: 'CustomerDetail',
        params: {
          customer_id: id
        }
      });
    }
  }
}
</script>

<style lang="css">
.customer-wrapper {
  margin: 20px;
  margin-left: 10px;
  text-align: center;
}

.customer-wrapper .control .input {
  width: 300px;
}

.customer-wrapper .control .button {
  background-color: #00D1B3;
  border-color: #00D1B3;
  color: #FFFFFF;
  font-weight: 600;
}

.customer-wrapper .control .button:hover {
  border-color: #00D1B3;
  color: lightgrey;
}

.customer-wrapper .empty {
  font-weight: bold;
  color: grey;
}
</style>
