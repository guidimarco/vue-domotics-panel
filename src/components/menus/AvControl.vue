<template>
  <div v-if="activeZoneName && activeAvName" class="flex flex-col gap-4">
    <menu-wrapper title="ZONE">
      <base-button
        class="p-2 px-4 button-primary"
        :label="`Power Off ${activeZoneName}`"
        aria-label="Spengi i dispositivi A/V della zona"
        @click="powerOffZone"
      />
    </menu-wrapper>
    <menu-wrapper v-if="activeAvName" title="A/V">
      <base-button
        class="p-2 px-4 button-primary"
        :label="activeAvName"
        aria-label="Gestisci l'A/V attivo"
        @click="powerOffAv"
      />
    </menu-wrapper>
  </div>
  <div v-else class="h-full flex items-center justify-center">
    <span class="main-title">Nessuna Zona Selezionata</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import MenuWrapper from "@/components/menus/MenuWrapper.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default Vue.extend({
  name: "AvControl",
  components: {
    MenuWrapper,
    BaseButton,
  },
  computed: {
    ...mapGetters("appState", ["activeZoneId", "activeAv"]),
    ...mapGetters("zonesStore", ["getZoneById"]),
    activeZoneName() {
      const self = this as any;
      if (self.activeZoneId) {
        return self.getZoneById(self.activeZoneId).name;
      }
      return null;
    },
    activeAvName() {
      const self = this as any;
      return self.activeAv;
    },
  },
  methods: {
    ...mapActions("appState", ["resetActiveAv"]),
    ...mapActions("modalStore", ["closeModal"]),
    powerOffZone() {
      this.resetActiveAv();
      this.closeModal();
    },
    powerOffAv() {
      this.closeModal();
    },
  },
});
</script>
