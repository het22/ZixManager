<template lang="html">
<div class="input-form">
  <div class="columns">
    <div class="column is-3">
      <label :for="title">
        <div class="title">{{title}}</div>
      </label>
    </div>
    <div class="column">
      <div v-if="disabled">

      </div>
      <div v-else>
        <div class="control has-icons-left">
          <div class="select">
            <select v-model="propValue">
              <option :value="null">선택안함</option>
              <option v-for="option in options" :value="option.value">{{option.name}}</option>
            </select>
          </div>
          <span class="icon is-left">
            <i class="far fa-map"></i>
          </span>
        </div>
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
    'options'
  ],
  computed: {
    propValue: {
      get() {
        return this.value || null
      },
      set(newVal) {
        this.$emit('update:value', newVal)
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
