<template>
  <button
    v-if="icon || label"
    class="base-button"
    @pointerdown.prevent="$emit('click')"
    :aria-label="ariaLabel"
  >
    <span v-if="icon" class="material-symbols-outlined">{{ icon }}</span>
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BaseButton",
  props: {
    ariaLabel: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
  },
});
</script>

<style lang="scss">
.base-button {
  @apply cursor-pointer transition-all active:scale-95 flex flex-col items-center justify-center;
  gap: $gap-sm;
  min-height: $touch-target;
  min-width: $touch-target;

  @screen tablet {
    min-height: unset;
    min-width: unset;
    padding: $padding-sm $padding-md;
  }
}
</style>
