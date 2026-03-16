<template>
  <menu-wrapper class="items-center">
    <base-button
      class="w-60 button-primary"
      label="OFF"
      aria-label="Spegni i dispositivi A/V"
      @click="turnOffAv"
    />
    <div class="grid grid-cols-2 gap-4">
      <base-button
        v-for="av in avDevices"
        :key="av.id"
        class="p-4 px-8 button-primary"
        :icon="av.icon"
        :label="av.name"
        :aria-label="`Seleziona ${av.name}`"
        @click="changeActiveAv(av)"
      />
    </div>
  </menu-wrapper>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { Device } from "@/types/app.types";
import MenuWrapper from "@/components/menus/MenuWrapper.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default Vue.extend({
  name: "AvMenu",
  components: {
    MenuWrapper,
    BaseButton,
  },
  computed: {
    ...mapGetters("zonesStore", ["getAvDevices"]),
    avDevices() {
      const self = this as any;
      return self.getAvDevices().map((dev: Device) => {
        return {
          ...dev,
          icon: self.getAvDeviceIcon((dev.data as any)?.type),
        };
      });
    },
  },
  methods: {
    ...mapActions("modalStore", ["closeModal"]),
    ...mapActions("appState", ["setActiveAv", "resetActiveAv"]),
    getAvDeviceIcon(avType: string | null): string {
      const icons = new Map<string | null, string>([
        ["apple_tv", "apple"],
        ["dtv", "tv"],
        ["satellite", "settings_input_antenna"],
        ["blu_os", "audio_file"],
      ]);
      return icons.get(avType) ?? "settings_input_component";
    },
    changeActiveAv(av: Device) {
      this.setActiveAv(av.name);
      this.closeModal();
    },
    turnOffAv() {
      this.resetActiveAv();
      this.closeModal();
    },
  },
});
</script>
