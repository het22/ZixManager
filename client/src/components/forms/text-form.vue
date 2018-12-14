<template lang="html">
<div class="text-form">
  <div class="columns">
    <div class="column is-3">
      <div class="title">
        <label :for="title">{{title}}</label>
      </div>
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
.text-form {
  margin-left: 10px;
  margin-bottom: 10px;
}

.text-form .title {
  font-size: 15px;
  font-weight: 400;
}
</style>
