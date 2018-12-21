<template lang="html">
<div class="common-form">
  <div class="columns">
    <div class="column is-3">
      <label :for="title">
        <div class="title">{{title}}</div>
      </label>
    </div>
    <div class="column">
      <div v-if="disabled">
        <textarea class="textarea" :id="title" :placeholder="title" v-model="propValue" disabled></textarea>
      </div>
      <div v-else>
        <textarea class="textarea" :id="title" :placeholder="title" v-model="propValue"></textarea>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: [
    'disabled',
    'title',
    'value'
  ],
  computed: {
    propValue: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('update:value', newVal);
      }
    }
  }
}
</script>

<style lang="css">
</style>
