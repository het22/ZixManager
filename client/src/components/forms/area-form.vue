<template lang="html">
<div class="common-form">
  <div class="columns">
    <div class="column is-3">
      <label :for="title">
        <div class="title">{{title}}</div>
      </label>
    </div>
    <div class="column">
      <div class="field has-addons">
        <div class="control of-supply">
          <input
          class="input"
          :id="title"
          placeholder="공급평수"
          v-model="fisrtValue"></input>
        </div>
        <div class="control of-retail">
          <input
          class="input"
          :id="title"
          placeholder="실제평수"
          v-model="secondValue"></input>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: [
    'title',
    'value'
  ],
  computed: {
    fisrtValue: {
      get() {
        return this.value || ''
      },
      set(newVal) {
        this.$emit('update:value', newVal)
      }
    },
    secondValue: {
      get() {
        return this.value * 2.5 || ''
      },
      set(newVal) {
        this.$emit('update:value', newVal/2.5)
      }
    }
  }
}
</script>

<style lang="css">
</style>
