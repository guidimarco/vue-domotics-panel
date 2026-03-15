import { ActionContext } from "vuex";
import { ZonesStore, StoreState } from "./store.types";

// Mock Data
import unitJson from "@/db/unit.json";
import devicesJson from "@/db/devices.json";

export default {
  namespaced: true,
  state: () => ({
    zones: unitJson.zones,
    zone_devices: devicesJson,
  }),
  getters: {
    zones: (state: ZonesStore) => state.zones,
    visibleZones: (state: ZonesStore) =>
      state.zones.filter((zone) => zone.visible),
  },
  mutations: {
    TOGGLE_ZONE_VISIBILITY_MUTATION: (state: ZonesStore, zoneId: string) => {
      const zone = state.zones.find((zone) => zone.id === zoneId);
      if (zone) {
        zone.visible = !zone.visible;
      }
    },
  },
  actions: {
    toggleZoneVisibility: (
      { commit }: ActionContext<ZonesStore, StoreState>,
      zoneId: string
    ) => {
      commit("TOGGLE_ZONE_VISIBILITY_MUTATION", zoneId);
    },
  },
};
