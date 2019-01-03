<template lang="html">
<div class="order-wrapper">
  <!-- nav bar -->
  <nav class="level">
    <div class="level-left">
      <div class="level-item">
        <div class="field has-addons" style="margin: 0rem;">
          <div class="control has-icons-left">
            <input class="input" type="text" name="customer_name" placeholder="이름을 입력해주세요" v-model="keyword" v-on:keyup.enter="search" v-on:input="keywordChanged">
            <span class="icon is-left"><i class="fas fa-user"></i></span>
          </div>
          <div class="control">
            <div class="button" v-on:click="searchButtonTapped">검색</div>
          </div>
        </div>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item" style="font-weight: bold">
        <a class="button is-primary" v-on:click="newButtonTapped">
          <span class="icon"><i class="fas fa-user-plus"></i></span>
          <span>신규</span>
        </a>
      </div>
    </div>
  </nav>
  <!-- table -->
  <table class="table is-hoverable is-striped is-fullwidth">
    <thead>
      <tr>
        <th width="10%">주문회원</th>
        <th width="16%">상담일</th>
        <th width="16%">시공일</th>
        <th width="32%">시공지주소</th>
        <th>비고</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.ord_id" v-on:click="selectCell(order.ord_id)">
        <td>{{order.mem_username || '-'}}</td>
        <td>{{order.ord_date_consult || '-'}}</td>
        <td>{{order.ord_date_construct || '-'}}</td>
        <td>{{order.ord_adr_construct || '-'}}</td>
        <td>{{order.ord_remarks || '-'}}</td>
      </tr>
    </tbody>
  </table>
  <!-- empty -->
  <div class="empty" v-if="orders.length==0">
    <span class="icon"><i class="fas fa-table"></i></span>
    <span class="content">{{this.$constant.EMPTY_ORDERTABLE_MESSAGE}}</span>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      orders: []
    }
  },
  created() {
    this.fetchOrdersData();
  },
  methods: {
    fetchOrdersData() {
      this.$http.get('/article/order')
        .then((res) => {
          const data = res.data;
          if (!data) {
            this.flash('로드 실패', 'error', {
              timeout: this.$constant.FLASH_TIMEOUT
            });
          } else {
            this.orders = data;
          }
        })
    },
    keywordChanged(e) {
      this.keyword = e.target.value;
    },
    searchButtonTapped() {

    },
    newButtonTapped() {
      this.$router.push({name: 'OrderNew'})
    },
    selectCell(id) {
      this.$router.push({
        name: 'OrderDetail',
        params: {
          order_id: id
        }
      });
    }
  }
}
</script>

<style lang="css">
.order-wrapper {
  margin: 20px;
  margin-left: 10px;
  text-align: center;
}
.order-wrapper .control .input {
  width: 300px;
}
.order-wrapper .control .button {
  font-weight: 600;
}
.order-wrapper .control .button:hover {
  color: grey;
}
.order-wrapper .empty {
  font-weight: bold;
  color: grey;
}
</style>
