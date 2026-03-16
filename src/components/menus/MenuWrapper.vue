<template>
  <div class="w-full flex flex-col justify-center gap-4">
    <h3 v-if="title" class="text-text font-medium text-2xl">{{ title }}</h3>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MenuWrapper",
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
  },
});
</script>
