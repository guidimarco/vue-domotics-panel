<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <div class="spinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <p class="text-md">Loading...</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BaseSpinner",
});
</script>

<style lang="scss" scoped>
.spinner {
  @apply animate-spin rounded-full border-4 border-solid border-current border-r-transparent;
  @apply align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite];
  @apply h-12 w-12 border-4;
  @apply text-primary;
}
</style>
