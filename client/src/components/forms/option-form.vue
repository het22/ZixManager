<template lang="html">
<div class="input-form">
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
.input-form {
  margin-left: 10px;
  margin-bottom: 10px;
}

.input-form .title {
  font-size: 15px;
  font-weight: 400;
}
</style>
