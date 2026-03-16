<template>
  <div class="device-card">
    <div>{{ device.name }}</div>

    <!-- On/Off -->
    <div>
      <base-toggle
        v-if="device.type === 'light'"
        :id="device.id"
        :name="device.name"
        :value="device.name"
        :checked="device.power"
        @change="toggleDevicePowerAction"
      />
      <base-button
        v-else
        :icon="device.power ? 'power' : 'power_off'"
        :aria-label="device.power ? 'Spegni' : 'Accendi'"
        @click="toggleDevicePowerAction"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseToggle from "@/components/ui/BaseToggle.vue";

export default Vue.extend({
  name: "DeviceCard",
  components: {
    BaseButton,
    BaseToggle,
  },
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("zonesStore", ["toggleDevicePower"]),
    toggleDevicePowerAction() {
      this.toggleDevicePower(this.device.id);
    },
  },
});
</script>

<style lang="scss" scoped>
.device-card {
  @apply w-full bg-surface border hover:bg-surface/80 border-white/10 hover:border-white/20 rounded-2xl p-4 shadow-lg transition-all;
  @apply flex justify-between items-center;
}
</style>
