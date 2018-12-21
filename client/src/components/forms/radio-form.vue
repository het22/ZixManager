<template lang="html">
<div class="common-form">
  <div class="columns">
    <div class="column is-3">
      <label :for="title">
        <div class="title">{{title}}</div>
      </label>
    </div>
    <div class="column">
      <div class="control" style="margin-bottom: 5px">
        <input type="radio" class="is-checkradio" :id="title" :name="title" :value="null" v-model="propValue">
        <label :for="title" style="margin: 0px">선택안함</label>
      </div>
      <div class="control" v-for="option in options" style="margin-bottom: 5px">
        <input type="radio" class="is-checkradio" :id="title+option.name" :name="title" :value="option.value" v-model="propValue">
        <label :for="title+option.name" style="margin: 0px">{{option.name}}</label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import 'bulma-extensions/bulma-checkradio/dist/css/bulma-checkradio.min.css';
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
.common-form {
  margin-left: 10px;
  margin-bottom: 10px;
}

.common-form .title {
  font-size: 15px;
  font-weight: 400;
}
</style>
