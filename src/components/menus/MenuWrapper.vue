<template>
  <div class="flex flex-col justify-center gap-4 pt-4 px-8">
    <h3 class="text-text font-medium text-2xl">{{ title }}</h3>
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
      required: true,
    },
  },
});
</script>
