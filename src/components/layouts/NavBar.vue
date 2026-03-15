<template>
  <nav class="nav-bar glass" aria-label="Barra di navigazione">
    <base-button
      v-for="i in 3"
      :key="i"
      class="nav-bar-button tablet:orizzontal"
      icon="home"
      label="Home"
      aria-label="Home"
    />
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default Vue.extend({
  name: "NavBar",
  components: {
    BaseButton,
  },
});
</script>

<style lang="scss">
.nav-bar {
  @apply flex items-center justify-around;

  @screen landscape {
    @apply flex-col items-center justify-start;

    padding: $padding-md 0;
    gap: $gap-md;
  }

  @screen tablet {
    @apply items-start;

    padding: $padding-md;

    .nav-bar-button {
      @apply w-full;
    }
  }
}
</style>
