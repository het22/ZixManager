<template lang="html">
<div class="schedule-wrapper">
  <!-- nav bar -->
  <nav class="level">
    <div class="level-left">
      <div class="level-item">
        <date-picker class="datepicker" v-model="currentDate" v-on:change="dateChanged" lang="en"></date-picker>
      </div>
    </div>
  </nav>
  <div class="columns">
    <!-- 상담일 -->
    <div class="column">
      <div class="remark" style="color:#00D1B3;">상담일 기준</div>
      <div class="box">
        <span class="title" style="color:#00D1B3">D+0</span>
        <span class="subtitle" style="color:#00D1B3">예약 및 예약금 확인</span>
        <div class="schedule" v-for="s in schedule.consult.d0">
          <span style="font-weight: bold">· {{s.mem_username}}</span>
          <span>( {{s.mem_userid}}, {{s.mem_phone}} )</span>
          <div style="float: right">
            <router-link :to="{name: 'MemberDetail', params: {member_id: s.mem_id || 0}}">
              <span class="icon"><i class="fas fa-user"></i></span>
            </router-link>
            <router-link :to="{name: 'OrderDetail', params: {order_id: s.ord_id || 0}}">
              <span class="icon"><i class="fas fa-file-alt"></i></span>
            </router-link>
          </div>
        </div>
        <hr>
        <span class="title">D+1</span>
        <span class="subtitle">샘플 선택 및 발송</span>
        <div class="schedule" v-for="s in schedule.consult.dp1">
          <span style="font-weight: bold">· {{s.mem_username}}</span>
          <span>( {{s.mem_userid}}, {{s.mem_phone}} )</span>
          <div style="float: right">
            <router-link :to="{name: 'MemberDetail', params: {member_id: s.mem_id || 0}}">
              <span class="icon"><i class="fas fa-user"></i></span>
            </router-link>
            <router-link :to="{name: 'OrderDetail', params: {order_id: s.ord_id || 0}}">
              <span class="icon"><i class="fas fa-file-alt"></i></span>
            </router-link>
          </div>
        </div>
        <hr>
        <span class="title">D+4</span>
        <span class="subtitle">자재결정 해피콜</span>
        <div class="schedule" v-for="s in schedule.consult.dp4">
          <span style="font-weight: bold">· {{s.mem_username}}</span>
          <span>( {{s.mem_userid}}, {{s.mem_phone}} )</span>
          <div style="float: right">
            <router-link :to="{name: 'MemberDetail', params: {member_id: s.mem_id || 0}}">
              <span class="icon"><i class="fas fa-user"></i></span>
            </router-link>
            <router-link :to="{name: 'OrderDetail', params: {order_id: s.ord_id || 0}}">
              <span class="icon"><i class="fas fa-file-alt"></i></span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 시공일 -->
    <div class="column">
      <div class="remark" style="color:#ff3860;">시공일 기준</div>
      <div class="box">
        <span class="title">D-1</span>
        <span class="subtitle">시공 전 확인 (잔금,비번 등)</span>
        <div class="schedule" v-for="s in schedule.construct.dm1">
          <span style="font-weight: bold">· {{s.mem_username}}</span>
          <span>( {{s.mem_userid}}, {{s.mem_phone}} )</span>
          <div style="float: right">
            <router-link :to="{name: 'MemberDetail', params: {member_id: s.mem_id || 0}}">
              <span class="icon"><i class="fas fa-user"></i></span>
            </router-link>
            <router-link :to="{name: 'OrderDetail', params: {order_id: s.ord_id || 0}}">
              <span class="icon"><i class="fas fa-file-alt"></i></span>
            </router-link>
          </div>
        </div>
        <hr>
        <span class="title" style="color:#ff3860">D+0</span>
        <span class="subtitle" style="color:#ff3860">시공 당일</span>
        <div class="schedule" v-for="s in schedule.construct.d0">
          <span style="font-weight: bold">· {{s.mem_username}}</span>
          <span>( {{s.mem_userid}}, {{s.mem_phone}} )</span>
          <div style="float: right">
            <router-link :to="{name: 'MemberDetail', params: {member_id: s.mem_id || 0}}">
              <span class="icon"><i class="fas fa-user"></i></span>
            </router-link>
            <router-link :to="{name: 'OrderDetail', params: {order_id: s.ord_id || 0}}">
              <span class="icon"><i class="fas fa-file-alt"></i></span>
            </router-link>
          </div>
        </div>
        <hr>
        <span class="title">D+1</span>
        <span class="subtitle">시공완료 해피콜</span>
        <div class="schedule" v-for="s in schedule.construct.dp1">
          <span style="font-weight: bold">· {{s.mem_username}}</span>
          <span>( {{s.mem_userid}}, {{s.mem_phone}} )</span>
          <div style="float: right">
            <router-link :to="{name: 'MemberDetail', params: {member_id: s.mem_id || 0}}">
              <span class="icon"><i class="fas fa-user"></i></span>
            </router-link>
            <router-link :to="{name: 'OrderDetail', params: {order_id: s.ord_id || 0}}">
              <span class="icon"><i class="fas fa-file-alt"></i></span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  components: {
    DatePicker
  },
  data() {
    return {
      currentDate: new Date(),
      orders: [],
      schedule: {
        consult: {
          d0: [],
          dp1: [],
          dp4: []
        },
        construct: {
          dm1: [],
          d0: [],
          dp1: []
        }
      }
    }
  },
  created() {
    this.fetchOrders()
  },
  methods: {
    fetchOrders() {
      this.$http.get(`/article/schedule`)
        .then((res) => {
          const data = res.data;
          this.orders = data;
          this.updateSchedule(this.orders, this.currentDate)
        })
    },
    dateChanged() {
      this.updateSchedule(this.orders, this.currentDate)
    },
    updateSchedule(orders, date) {
      if (!date) return;

      // 1. 스케줄을 초기화한다.
      this.schedule.consult.d0 = []
      this.schedule.consult.dp1 = []
      this.schedule.consult.dp4 = []
      this.schedule.construct.dm1 = []
      this.schedule.construct.d0 = []
      this.schedule.construct.dp1 = []

      // 2. 영업일 기준으로 d-1,d-4,d+1의 날짜를 계산해둔다.
      date.setHours(0, 0, 0, 0);
      var d0 = date.getTime();
      var dm1 = calBusiDay(date, -1).getTime();
      var dm4 = calBusiDay(date, -4).getTime();
      var dp1 = calBusiDay(date, 1).getTime();

      // 3. 주문정보를 순회하며 날짜를 대조하고, 조건에 맞으면 배열에 넣는다.
      for (var i in orders) {
        var o = orders[i];
        // 상담일 기준 확인
        var consultDate = new Date(o.ord_date_consult).setHours(0, 0, 0, 0);
        switch (consultDate) {
          case d0:
            this.schedule.consult.d0.push(o);
            break;
          case dm1:
            this.schedule.consult.dp1.push(o);
            break;
          case dm4:
            this.schedule.consult.dp4.push(o);
            break;
        }
        // 시공일 기준 확인
        var constructDate = new Date(o.ord_date_construct).setHours(0, 0, 0, 0);
        switch (constructDate) {
          case dp1:
            this.schedule.construct.dm1.push(o);
            break;
          case d0:
            this.schedule.construct.d0.push(o);
            break;
          case dm1:
            this.schedule.construct.dp1.push(o);
            break;
        }
      }
    }
  }
}

// 영업일 계산기
function calBusiDay(date, offset) {
  var i = Math.abs(offset);
  var j = (offset > 0) ? 1 : -1;
  var busiDay = date;
  while (i > 0) {
    busiDay = new Date(busiDay.getTime() + 24 * 60 * 60 * 1000 * j)
    if (busiDay.getDay() != 0 && busiDay.getDay() != 6) {
      i--;
    }
  }
  return busiDay;
}
</script>

<style lang="css">
.schedule-wrapper {
  margin: 20px;
  margin-left: 10px;
}

.schedule-wrapper .title {
  font-size: 36px;
}
.schedule-wrapper .subtitle {
  font-size: 16px;
  font-weight: bold;
}
.schedule-wrapper .remark {
  margin: 0px 10px 5px 0px;
  text-align: right;
  font-weight: bold;
}
.schedule-wrapper .schedule {
  margin: 12px 0px 0px 6px;
}
</style>
