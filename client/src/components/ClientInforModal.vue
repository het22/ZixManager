<template>
<transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal">
      <slot name="header">
        <a class="button is-danger" v-on:click="close">
          Close
        </a>
      </slot>
      <slot name="body">
        <div class="container has-text-centered">
          <div class="column is-6 is-offset-3">
            <div class="box">
            </div>
          </div>
        </div>
      </slot>
      <slot name="footer">

      </slot>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'modal',
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease
}
</style>
