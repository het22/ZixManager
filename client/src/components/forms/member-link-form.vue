<template lang="html">
<div class="common-form">
  <div class="columns">
    <div class="column is-3">
      <label :for="title">
        <div class="title" style="font-weight: bold">{{title}}</div>
      </label>
    </div>
    <div class="column">
      <div v-if="mem_id==0">
        {{value}}
      </div>
      <div v-else>
        <router-link :to="{name: 'MemberDetail', params: {member_id: mem_id || 0}}">
          {{value}}
        </router-link>
      </div>
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
</style>
