<template>
  <nav class="nav-bar bar-style" aria-label="Barra di navigazione">
    <router-link
      v-for="routeObj in visibleRoutes"
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
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters("appState", ["isAdmin", "enabledModules", "activeZoneId"]),
    visibleRoutes(): NavConfig[] {
      const self = this as any;
      return this.routes.filter((route) => {
        if (route.adminOnly && !self.isAdmin) return false;
        if (route.module && !self.enabledModules.includes(route.module))
          return false;
        return true;
      });
    },
  },
  methods: {
    getLocation(routeObj: NavConfig): RawLocation {
      let location: RawLocation = { name: routeObj.routeName };
      if (routeObj.needZoneId) {
        const self = this as any;
        location.params = { zoneId: self.activeZoneId };
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
