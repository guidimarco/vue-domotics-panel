<template>
  <portal to="zone-modal-target">
    <transition name="modal-fade">
      <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </transition>
  </portal>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BaseModal",
});
</script>

<style lang="scss" scoped>
.modal-overlay {
  @apply absolute inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center;
}

.modal-content {
  transition: all 0.3s ease-out;
  overflow-y: auto;
  @apply bg-background relative w-full h-full p-4 border-0 flex flex-col items-center justify-start;

  @screen tablet {
    max-width: 650px;
    @apply w-4/5 h-4/5 rounded-3xl border border-white/80 shadow-2xl;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;

  .modal-content {
    @apply scale-90 translate-y-4;
  }
}
</style>
