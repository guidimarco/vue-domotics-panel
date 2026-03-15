<template>
  <div class="flex flex-col items-center justify-center">
    <menu-wrapper title="Impostazioni">
      <template #default>
        <div role="radiogroup" class="w-full grid grid-cols-3 gap-4">
          <base-radio
            v-for="sat in satOptions"
            :key="sat"
            :id="sat"
            name="sat"
            :value="sat"
            :label="sat"
            :checked="selectedSatOption === sat"
            @change="changeSelectedSat(sat)"
          />
        </div>
      </template>
    </menu-wrapper>

    <menu-wrapper title="Visibilità delle Zone">
      <template #default>
        <div class="w-full grid grid-cols-3 gap-4">
          <base-toggle
            v-for="zone in zones"
            :key="zone.id"
            vertical
            :id="zone.id"
            :name="`toggle-${zone.id}`"
            :value="zone.id"
            :label="zone.name"
            :checked="zone.visible"
            @change="toggleZoneVisibility(zone.id)"
          />
        </div>
      </template>
    </menu-wrapper>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import MenuWrapper from "@/components/menus/MenuWrapper.vue";
import BaseRadio from "@/components/ui/BaseRadio.vue";
import BaseToggle from "@/components/ui/BaseToggle.vue";

export default Vue.extend({
  name: "SettingsView",
  components: {
    MenuWrapper,
    BaseRadio,
    BaseToggle,
  },
  computed: {
    ...mapGetters("settingsStore", ["selectedSatOption", "satOptions"]),
    ...mapGetters("zonesStore", ["zones"]),
  },
  methods: {
    ...mapActions("settingsStore", ["changeSelectedSat"]),
    ...mapActions("zonesStore", ["toggleZoneVisibility"]),
  },
});
</script>
