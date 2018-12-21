<template lang="html">
<div class="common-form">
  <div class="columns">
    <div class="column is-3">
      <label :for="title">
        <div class="title">{{title}}</div>
      </label>
    </div>
    <div class="column">
      <router-link :to="{name: 'MemberDetail', params: {member_id: mem_id || 0}}">
        {{value}}
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: [
    'title',
    'value',
    'mem_id'
  ]
}
</script>

<style lang="css">
.common-form {
  margin-left: 10px;
  margin-bottom: 10px;
}

.common-form .title {
  font-size: 15px;
  font-weight: 400;
}
</style>
