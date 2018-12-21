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
          placeholder="공급가"
          v-model="prop_spl_cost"
          style="color:#ff3860"></input>
        </div>
        <div class="control of-retail">
          <input
          class="input"
          :id="title"
          placeholder="소비자가"
          v-model="prop_rtl_cost"
          style="color:#00D1B3"></input>
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
    'rtl_cost',
    'spl_cost'
  ],
  computed: {
    prop_rtl_cost: {
      get() {return this.rtl_cost},
      set(newVal) {this.$emit('update:rtl_cost', newVal)}
    },
    prop_spl_cost: {
      get() {return this.spl_cost},
      set(newVal) {this.$emit('update:spl_cost', newVal)}
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
