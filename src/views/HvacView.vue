<template>
  <div class="view-wrapper devices-wrapper">
    <device-card
      v-for="device in hvacDevices"
      :key="device.id"
      :device="device"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Device } from "@/types/app.types";
import DeviceCard from "@/components/ui/DeviceCard.vue";

export default Vue.extend({
  name: "HvacView",
  components: {
    DeviceCard,
  },
  computed: {
    ...mapGetters("zonesStore", ["getHvacDevices"]),
    hvacDevices() {
      const self = this as any;
      return self.getHvacDevices().map((device: Device) => {
        return {
          ...device,
        };
      });
    },
  },
});
</script>
