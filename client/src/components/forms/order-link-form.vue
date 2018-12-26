<template lang="html">
<div class="common-form">
  <div class="columns">
    <div class="column is-3">
      <label :for="title">
        <div class="title" style="font-weight: bold">{{title}}</div>
      </label>
    </div>
    <div class="column">
      <router-link :to="{name: 'OrderDetail', params: {order_id: ord_id || 0}}">
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
    'ord_id'
  ]
}
</script>

<style lang="css">
</style>
