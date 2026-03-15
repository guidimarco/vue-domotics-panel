<template>
  <div class="view-wrapper" :class="{ 'center-content': loading }">
    <base-spinner v-if="loading" />
    <template v-else>
      <div class="flex justify-center">
        <base-button
          class="w-60 button-primary"
          :label="activeAvName ? activeAvName : 'OFF'"
          aria-label="Apri il menu di scelta dell'A/V"
          @click="openAvModal"
        />
      </div>
      <div class="flex-1 flex items-center justify-center">
        <span v-if="!isValidActiveZone" class="main-title">
          Nessuna Zona Selezionata
        </span>
        <div v-else-if="!activeAvName" class="main-title">
          {{ activeZoneName }} is off<br />
          Select a source from the dropdown menu
        </div>
        <div v-else>
          <img
            class="max-h-[60vh]"
            src="../../public/av_control.svg"
            alt="Controllo A/V"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";

export default Vue.extend({
  name: "AvView",
  components: {
    BaseButton,
    BaseSpinner,
  },
  computed: {
    ...mapGetters("appState", ["activeZoneId", "activeAv", "loadingAv"]),
    ...mapGetters("zonesStore", ["getZoneById"]),
    isValidActiveZone(): boolean {
      const self = this as any;
      return self.activeZoneId !== null && self.activeZoneName !== null;
    },
    activeZoneName() {
      const self = this as any;
      if (self.activeZoneId) {
        const zone = self.getZoneById(self.activeZoneId);
        if (zone) {
          return zone.name;
        }
      }
      return null;
    },
    activeAvName() {
      const self = this as any;
      return self.activeAv;
    },
    loading(): boolean {
      const self = this as any;
      return self.loadingAv;
    },
  },
  methods: {
    openAvModal() {
      this.$root.$emit("toggle-modal", {
        modalId: "av-menu-modal",
        component: "AvMenu",
        props: {},
      });
    },
  },
});
</script>
