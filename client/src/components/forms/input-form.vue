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
        <input class="input" :id="title" :placeholder="title" v-model="propValue" disabled></input>
      </div>
      <div v-else>
        <input class="input" :id="title" :placeholder="title" v-model="propValue"></input>
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
.common-form {
  margin-left: 10px;
  margin-bottom: 10px;
}

.common-form .title {
  font-size: 15px;
  font-weight: 400;
}
</style>
