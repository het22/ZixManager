<template lang="html">
<div class="common-form">
  <div class="columns">
    <div class="column is-3">
      <label :for="title">
        <div class="title">{{title}}</div>
      </label>
    </div>
    <div class="column">
      <input class="switch" type="checkbox" :id="title" v-model="propValue">
      <label :for="title"></label>
    </div>
  </div>
</div>
</template>

<script>
import 'bulma-extensions/bulma-switch/dist/css/bulma-switch.min.css';
export default {
  props: [
    'title',
    'value',
    'options'
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
