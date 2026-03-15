import { ActionContext } from "vuex";
import { StoreState, ZonesStore } from "./store.types";
import { Zone } from "@/types/app.types";

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
    zones: (zones: ZonesStore) => zones.zones,
    visibleZones: (zones: ZonesStore) =>
      zones.zones.filter((zone) => zone.visible),
  },
  mutations: {
    SET_ZONES: (state: StoreState, payload: Partial<ZonesStore>) => {
      state.zonesStore = { ...state.zonesStore, ...payload };
    },
  },
  actions: {
    getZoneById: (
      { state }: ActionContext<StoreState, StoreState>,
      payload: Pick<Zone, "id">
    ) => {
      return state.zonesStore.zones.find((zone) => zone.id === payload.id);
    },
    setZones: (
      { commit }: ActionContext<StoreState, StoreState>,
      payload: Pick<ZonesStore, "zones">
    ) => {
      /**
       * TODO: Aggiungere validazione:
       * - Filtrare le zone del payload rispetto alle zone ammesse dalla sessione (state.appState.zone_ids).
       */
      commit("SET_ZONES", { zones: payload.zones });
    },
    toggleZoneVisibility: (
      { commit, state }: ActionContext<StoreState, StoreState>,
      payload: Pick<Zone, "id">
    ) => {
      commit("SET_ZONES", {
        zones: state.zonesStore.zones.map((zone) =>
          zone.id === payload.id ? { ...zone, visible: !zone.visible } : zone
        ),
      });
    },
    setZoneDevices: (
      { commit }: ActionContext<StoreState, StoreState>,
      payload: Pick<ZonesStore, "zone_devices">
    ) => {
      commit("SET_ZONES", { zone_devices: payload.zone_devices });
    },
  },
};
