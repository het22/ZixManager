<template lang="html">
<div class="member-detail-wrapper">
  <div class="menu-container">
    <div class="button">
      뒤로가기
    </div>
    <div class="button">
      수정
    </div>
    <div class="button">
      삭제
    </div>
  </div>
  <div class="columns">
    <div class="column is-6">
      <div class="box">
        <div class="title">
          개인정보
        </div>
        <div class="columns">
          <div class="column is-4">
            <div class="subtitle">
              이름
            </div>
          </div>
          <div class="column">
            <div class="input"/>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="box">
        <div class="title">
          시공정보
        </div>
      </div>
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
    this.fetchMemberDetailData();
  },
  methods: {
    fetchMemberDetailData() {
      console.log('member detail infor requested');
      const id = this.customer_id;
      this.$http.get('/article/customer/' + id)
        .then((res) => {
          const data = res.data;
          this.detail = data[0];
          console.log('member detail infor loaded');
        })
    }
  }
}
</script>

<style lang="css">
.member-detail-wrapper {
  margin: 20px;
  margin-left: 10px;
}
.member-detail-wrapper .title {
  font-size: 30px;
  font-weight: bold;
}

.member-detail-wrapper .menu-container {
  height: 3rem;
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
