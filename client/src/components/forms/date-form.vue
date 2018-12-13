<template lang="html">
<div class="date-form">
  <div class="columns">
    <div class="column is-3">
      <div class="title">
        <label :for="title">{{title}}</label>
      </div>
    </div>
    <div class="column">
      <div class="columns is-variable is-1" v-on:change="dateChanged">
        <!-- year -->
        <div class="column is-4">
          <div class="select is-fullwidth">
            <select id="year" v-model="propValue.getFullYear()">
              <option value="NaN">YYYY</option>
              <option v-for="n in 70" :value="1951+n">{{1951+n}}</option>
            </select>
          </div>
        </div>
        <!-- month -->
        <div class="column is-4">
          <div class="select is-fullwidth">
            <select id="month" v-model="propValue.getMonth()+1">
              <option value="NaN">MM</option>
              <option v-for="n in 12" :value="0+n">{{0+n}}</option>
            </select>
          </div>
        </div>
        <!-- date -->
        <div class="column is-4">
          <div class="select is-fullwidth">
            <select id="date" v-model="propValue.getDate()">
              <option value="NaN">DD</option>
              <option v-for="n in 31" :value="0+n">{{0+n}}</option>
            </select>
          </div>
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
    propValue: {
      get() {
        return new Date(this.value)
      },
      set(val) {
        this.$emit('update:value', val);
      }
    }
  },
  methods: {
    dateChanged() {
      var year = document.getElementById('year').value*1;
      var month = document.getElementById('month').value*1;
      var date = document.getElementById('date').value*1;
      var newDate = new Date(year, month-1, date+1);
      if (isNaN(newDate)) {
        return
      }
      newDate = newDate.getUTCFullYear() + '-' +
        ('00' + (newDate.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + newDate.getUTCDate()).slice(-2)
      this.propValue = newDate;
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
</style>
