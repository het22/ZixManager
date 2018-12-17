<template lang="html">
<div class="input-form">
  <div class="columns">
    <div class="column is-3">
      <div class="title">
        <label :for="title">{{title}}</label>
      </div>
    </div>
    <div class="column">
      <div class="field has-addons">
        <div class="control of-supply">
          <input
          class="input"
          :id="title"
          placeholder="공급가"
          v-model="prop_supply_cost"
          style="color:#ff3860"></input>
        </div>
        <div class="control of-retail">
          <input
          class="input"
          :id="title"
          placeholder="소비자가"
          v-model="prop_retail_cost"
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
    'retail_cost',
    'supply_cost'
  ],
  computed: {
    prop_retail_cost: {
      get() {return this.retail_cost},
      set(newVal) {this.$emit('update:retail_cost', newVal)}
    },
    prop_supply_cost: {
      get() {return this.supply_cost},
      set(newVal) {this.$emit('update:supply_cost', newVal)}
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
