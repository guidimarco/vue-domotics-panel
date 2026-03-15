<template>
  <label :for="id">
    <input
      type="radio"
      role="radio"
      class="sr-only peer"
      :id="id"
      :name="name"
      :value="value"
      :checked="checked"
      @change="$emit('change', value)"
    />

    <div class="flex items-center gap-2 peer-focus:ring-2">
      <div
        class="w-4 h-4 rounded-full border-2 transition-all"
        :class="checked ? 'border-primary' : 'border-white/60'"
      >
        <div
          v-if="checked"
          class="w-full h-full rounded-full bg-primary scale-50"
        ></div>
      </div>
      <span class="text-md">{{ label }}</span>
    </div>
  </label>
</template>

<script>
export default {
  name: "BaseRadio",
  props: {
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
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
