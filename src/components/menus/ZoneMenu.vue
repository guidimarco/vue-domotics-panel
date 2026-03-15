<template>
  <menu-wrapper title="ZONE">
    <div class="grid grid-cols-3 gap-4">
      <base-button
        v-for="zone in selectableZones"
        :key="zone.id"
        class="button-primary orizzontal"
        :label="zone.name"
        :aria-label="`Seleziona la zona ${zone.name}`"
        @click="setActiveZone(zone.id)"
      />
    </div>
  </menu-wrapper>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import MenuWrapper from "@/components/menus/MenuWrapper.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { Zone } from "@/types/app.types";

export default Vue.extend({
  name: "ZoneMenu",
  components: {
    MenuWrapper,
    BaseButton,
  },
  computed: {
    ...mapGetters("zonesStore", ["visibleZones"]),
    ...mapGetters("appState", ["activeZoneId"]),
    selectableZones(): Zone[] {
      const self = this as any;
      return self.visibleZones.filter(
        (zone: Zone) => zone.id !== self.activeZoneId
      );
    },
  },
  methods: {
    ...mapActions("appState", ["setActiveZoneId"]),
    ...mapActions("modalStore", ["closeModal"]),
    setActiveZone(zoneId: string) {
      this.setActiveZoneId(zoneId);
      this.closeModal();
    },
  },
});
</script>
