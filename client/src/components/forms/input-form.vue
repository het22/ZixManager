<template lang="html">
<div class="common-form">
  <div class="columns">
    <div class="column is-3">
      <label :for="title">
        <div v-if="essential">
          <div class="title" style="font-weight: bold">{{title}}</div>
        </div>
        <div v-else>
          <div class="title">{{title}}</div>
        </div>
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
    'value',
    'essential'
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
