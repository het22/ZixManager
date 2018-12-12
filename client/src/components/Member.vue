<template lang="html">
<div class="member-wrapper">
  <!-- search bar -->
  <nav class="level">
    <div class="level-left">
      <p class="level-item">
        <div class="field has-addons" style="margin: 0rem;">
          <div class="control has-icons-left">
            <input class="input" type="text" name="customer_name" placeholder="이름을 입력해주세요" v-model="keyword" v-on:keyup.enter="search" v-on:input="keywordChanged">
            <span class="icon is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
          <div class="control">
            <div class="button" v-on:click="search">
              검색
            </div>
          </div>
        </div>
      </p>
    </div>
    <div class="level-right">
      <p class="level-item" style="font-weight: bold">
        <a class="button is-primary">
          <span class="icon">
            <i class="fas fa-user-plus"></i>
          </span>
          <span>신규</span>
        </a>
      </p>
    </div>
  </nav>
  <!-- table -->
  <table class="table is-hoverable is-striped">
    <thead>
      <tr>
        <th width="8%">ID</th>
        <th width="12%">이름</th>
        <th width="18%">연락처</th>
        <th width="32%">주소</th>
        <th>비용</th>
      </tr>
    </thead>
    <tbody v-if="members.length > 0">
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
      console.log('member infor requested');
      this.$http.get('/article/member')
        .then((res) => {
          const data = res.data;
          if (!data) {
            console.log('member infor load failed');
            return
          } else {
            this.members = data;
            console.log('member infor loaded('+data.length+' rows)');
          }
        })
    },
    selectCell(id) {
      this.$router.push({
        name: 'MemberDetail',
        params: {
          member_id: id
        }
      });
    }
  }
}
</script>

<style lang="css">
.member-wrapper {
  margin: 20px;
  margin-left: 10px;
  text-align: center;
}

.member-wrapper .control .input {
  width: 300px;
}

.member-wrapper .control .button {
  font-weight: 600;
}

.member-wrapper .control .button:hover {
  border-color: #00D1B3;
  color: lightgrey;
}

.member-wrapper .empty {
  font-weight: bold;
  color: grey;
}
</style>
