<template lang="html">
<div class="date-form">
  <div class="columns">
    <div class="column is-3">
      <label :for="title">
        <div class="title">{{title}}</div>
      </label>
    </div>
    <div class="column">
      <date-picker class="datepicker" v-model="propValue" lang="en"></date-picker>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  components: {
    DatePicker
  },
  props: [
    'title',
    'value'
  ],
  computed: {
    propValue: {
      get() {
        return this.value;
      },
      set(newVal) {
        var newDate = null;
        if (newVal!=null) {
          newDate = newVal.getUTCFullYear() + '-' +
          ('00' + (newVal.getUTCMonth() + 1)).slice(-2) + '-' +
          ('00' + (newVal.getUTCDate() + 1)).slice(-2)
        }
        this.$emit('update:value', newDate);
      }
    }
  }
}
</script>

<style lang="css">
.date-form {
  margin-left: 10px;
  margin-bottom: 10px;
}

.date-form .title {
  font-size: 15px;
  font-weight: 400;
}
.datepicker {
  width: 100%;
}
</style>
