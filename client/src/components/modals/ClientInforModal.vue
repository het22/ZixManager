<template>
<transition name="modal-fade">
  <div class="modal-backdrop" v-on:click="close">
    <div class="modal-container" v-on:click.stop>
      <!-- modal header -->
      <slot name="header">

      </slot>
      <!-- modal body -->
      <slot name="body">
        <div class="container has-text-centered">
          <div class="columns">
            <div class="column is-4">
              <privacyBox></privacyBox>
            </div>
            <div class="column is-4">
              <constructBox></constructBox>
            </div>
            <div class="column is-4">
              <costBox></costBox>
            </div>
          </div>
        </div>
      </slot>
      <!-- modal footer -->
      <slot name="footer">

      </slot>
    </div>
  </div>
</transition>
</template>

<script>
import privacyBox from '../boxes/PrivacyBox.vue';
import constructBox from '../boxes/ConstructBox.vue';
import costBox from '../boxes/CostBox.vue';
export default {
  name: 'modal',
  components: {
    privacyBox,
    constructBox,
    costBox
  },
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
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  min-width: 15rem;
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
