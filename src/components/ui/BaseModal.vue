<template>
  <portal to="main-modal-target">
    <transition name="modal-fade">
      <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
          <div class="modal-content-header">
            <h3 class="text-text font-medium text-lg">{{ title }}</h3>

            <base-button
              class="orizzontal button-primary"
              icon="close"
              label="Chiudi"
              aria-label="Chiudi la modale"
              @click="$emit('close')"
            />
          </div>
          <div class="w-full flex-1 overflow-y-auto p-4">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script lang="ts">
import Vue from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default Vue.extend({
  name: "BaseModal",
  components: {
    BaseButton,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.modal-overlay {
  @apply absolute inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center;
}

.modal-content {
  transition: all 0.3s ease-out;
  @apply bg-background relative w-full h-full p-4 border-0 flex flex-col items-center justify-center;

  .modal-content-header {
    @apply w-full flex items-center justify-between pb-2 border-b border-white/40;
  }

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
