<template>
  <button
    v-if="icon || label"
    class="base-button"
    :class="{ 'text-primary': active }"
    @pointerdown="$emit('click', $event)"
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
    active: {
      type: Boolean,
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

  &.orizzontal {
    padding: $padding-sm $padding-md;
  }

  @screen tablet {
    padding: $padding-sm $padding-md;
    min-height: unset;
    min-width: unset;
  }
}
</style>
