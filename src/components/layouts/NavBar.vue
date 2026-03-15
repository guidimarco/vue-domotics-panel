<template>
  <nav class="nav-bar bar-style" aria-label="Barra di navigazione">
    <router-link
      v-for="routeObj in routes"
      :key="routeObj.id"
      :to="getLocation(routeObj)"
      custom
      v-slot="{ navigate, isExactActive }"
    >
      <base-button
        class="nav-bar-button tablet:orizzontal"
        :icon="routeObj.icon"
        :label="routeObj.label"
        :aria-label="`Vai a ${routeObj.label}`"
        :active="isExactActive"
        @click="navigate"
      />
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { RawLocation } from "vue-router";
import { NavConfig, navConfig } from "@/config/navigation";
import BaseButton from "@/components/ui/BaseButton.vue";

export default Vue.extend({
  name: "NavBar",
  components: {
    BaseButton,
  },
  data() {
    return {
      routes: navConfig,
    };
  },
  methods: {
    getLocation(routeObj: NavConfig): RawLocation {
      let location: RawLocation = { name: routeObj.routeName };
      if (routeObj.needZoneId) {
        location.params = { zoneId: "zone-001" };
        // ^ ^ ^ TODO: sostituire con quella dello store
      }
      return location;
    },
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
