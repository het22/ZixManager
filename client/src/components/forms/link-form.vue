<template lang="html">
<div class="input-form">
  <div class="columns">
    <div class="column is-3">
      <label :for="title">
        <div class="title">{{title}}</div>
      </label>
    </div>
    <div class="column">
      <router-link :to="{ name: 'MemberDetail', params: {member_id: 1} }">
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
    'value'
  ]
}
</script>

<style lang="css">
.input-form {
  margin-left: 10px;
  margin-bottom: 10px;
}

.input-form .title {
  font-size: 15px;
  font-weight: 400;
}
</style>
