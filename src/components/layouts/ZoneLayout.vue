<template>
  <div class="zone-layout">
    <app-header />
    <main class="relative flex-1">
      <router-view />

      <portal-target name="zone-modal-target" multiple />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "@/components/layouts/AppHeader.vue";

export default Vue.extend({
  name: "ZoneLayout",
  components: {
    AppHeader,
  },
  computed: {
    currentZone() {
      return this.$route.params.zoneId;
    },
  },
});
</script>

<style lang="scss">
.zone-layout {
  @apply flex flex-col h-full;
}
</style>
