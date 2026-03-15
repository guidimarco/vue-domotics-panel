<template>
  <header class="bar-style flex items-center justify-between px-2 gap-4">
    <div class="button-wrapper">
      <base-button
        v-if="canShowMenuButton"
        :icon="isMenuModalOpen ? 'close' : 'menu'"
        :aria-label="
          isMenuModalOpen
            ? 'Chiudi il menu delle zone'
            : 'Apri il menu delle zone'
        "
        @click="toggleMenuModal"
      />
    </div>

    <div
      class="text-text font-medium text-xl overflow-hidden text-ellipsis whitespace-nowrap"
    >
      <h2>{{ activeZoneName }}</h2>
    </div>

    <div class="button-wrapper">
      <base-button
        icon="power_settings_new"
        aria-label="Gestisci i dispositivi A/V"
        @click="toggleAvModal"
      />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import BaseButton from "@/components/ui/BaseButton.vue";

export default Vue.extend({
  name: "AppHeader",
  components: {
    BaseButton,
  },
  computed: {
    ...mapGetters("appState", ["activeZoneId"]),
    ...mapGetters("zonesStore", ["visibleZones", "getZoneById"]),
    ...mapGetters("modalStore", ["showModal", "modalId"]),
    canShowMenuButton(): boolean {
      const self = this as any;
      return self.visibleZones.length > 1;
    },
    isMenuModalOpen(): boolean {
      const self = this as any;
      return self.showModal && self.modalId === "menu-modal";
    },
    activeZoneName(): string {
      const self = this as any;
      console.log(self.activeZoneId, self.getZoneById(self.activeZoneId));
      if (self.activeZoneId) {
        const zone = self.getZoneById(self.activeZoneId);
        if (zone) {
          return zone.name;
        }
      }
      return "Nessuna zona selezionata";
    },
  },
  methods: {
    toggleMenuModal() {
      this.$root.$emit("toggle-modal", {
        modalId: "menu-modal",
        component: "ZoneMenu",
        props: {},
      });
    },
    toggleAvModal() {
      this.$root.$emit("toggle-modal", {
        modalId: "av-modal",
        component: null,
        props: {},
      });
    },
  },
});
</script>

<style lang="scss">
.button-wrapper {
  min-width: $touch-target;
}
</style>
