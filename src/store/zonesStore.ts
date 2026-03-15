import { ActionContext } from "vuex";
import { ZonesStore, StoreState } from "./store.types";
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
    zones: (state: ZonesStore) => state.zones,
    visibleZones: (state: ZonesStore) =>
      state.zones.filter((zone) => zone.visible),
    getZoneById: (state: ZonesStore) => (zoneId: string) => {
      return state.zones.find((zone) => zone.id === zoneId);
    },
  },
  mutations: {
    SET_ZONE_VISIBILITY_MUTATION: (
      state: ZonesStore,
      { id, visible }: Partial<Zone>
    ) => {
      const zone = state.zones.find((zone) => zone.id === id) ?? null;
      if (zone && visible !== undefined) {
        zone.visible = visible;
      }
    },
  },
  actions: {
    toggleZoneVisibility: async (
      {
        commit,
        state,
        rootState,
        dispatch,
        getters,
      }: ActionContext<ZonesStore, StoreState>,
      zoneId: string
    ) => {
      const zone = getters.getZoneById(zoneId);
      if (zone) {
        const isVisible = zone.visible;
        commit("SET_ZONE_VISIBILITY_MUTATION", {
          id: zoneId,
          visible: !isVisible,
        });

        const activeZoneId = rootState.appState.active_zone_id;
        if (isVisible && activeZoneId === zoneId) {
          // ^ ^ ^ Visibile => NON Visibile
          // Controllo se è attiva => sostituisco
          const nextVisibleZone = state.zones.find(
            (zone) => zone.visible && zone.id !== zoneId
          );
          const nextVisibleZoneId = nextVisibleZone ? nextVisibleZone.id : null;
          dispatch(
            "appState/setActiveZoneId",
            {
              active_zone_id: nextVisibleZoneId,
            },
            { root: true }
          );
        } else if (!isVisible && !activeZoneId) {
          // ^ ^ ^ NON Visibile => Visibile
          // Se NON ci sono attive => la attivo
          dispatch(
            "appState/setActiveZoneId",
            { active_zone_id: zoneId },
            { root: true }
          );
        }
      }
    },
  },
};
