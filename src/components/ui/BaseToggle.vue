<template>
  <div
    class="flex items-center gap-4"
    :class="vertical ? 'flex-col' : 'flex-row'"
  >
    <span v-if="label">{{ label }}</span>
    <label :for="id" class="base-toggle">
      <input
        type="checkbox"
        class="sr-only"
        :id="id"
        :name="name"
        :value="value"
        :checked="checked"
        role="switch"
        :aria-checked="checked"
        @change="$emit('change', value)"
      />

      <div class="toggle-track" :class="{ checked }">
        <div class="toggle-thumble" :class="{ checked }"></div>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseToggle",
  props: {
    label: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.base-toggle {
  @apply relative inline-flex items-center cursor-pointer;
}

.toggle-thumble {
  @apply w-4 h-4 bg-white rounded-full absolute -top-1 transition-all shadow-md;

  &.checked {
    @apply bg-primary left-5;
  }
}

.toggle-track {
  @apply w-8 h-2 bg-white/60 -left-1 rounded-full transition-colors;

  &.checked {
    @apply bg-primary/80;
  }
}
</style>
