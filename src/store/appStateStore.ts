import { ActionContext } from "vuex";
import { StoreState, AppState } from "./store.types";

// Mock Data
import sessionJson from "@/db/session.json";
import unitJson from "@/db/unit.json";
import devicesJson from "@/db/devices.json";

const zoneIds = unitJson.zones.map((zone) => zone.id);
const activeZoneId = unitJson.zones.find((zone) => zone.visible)?.id ?? null;
const enabledModules = activeZoneId
  ? new Set<string>(devicesJson.map((device) => device.type))
  : new Set<string>();

const userRole = sessionJson.role;

export default {
  namespaced: true,
  state: () => ({
    // Session data
    user_role: userRole,
    unit_id: sessionJson.unit_id,
    brand: unitJson.brand,
    zone_ids: zoneIds,
    // App data (dynamic)
    active_zone_id: activeZoneId,
    enabled_modules: Array.from(enabledModules),
    active_av_id: null,
  }),
  getters: {
    isAdmin: (appState: AppState) => appState.user_role === "admin",
    brand: (appState: AppState) => appState.brand,
    activeZoneId: (appState: AppState) => appState.active_zone_id,
    allowedZones: (appState: AppState) => appState.zone_ids,
    enabledModules: (appState: AppState) => appState.enabled_modules,
  },
  mutations: {
    SET_APP_STATE: (state: AppState, payload: Partial<AppState>) => {
      Object.assign(state, payload);
    },
  },
  actions: {
    setActiveZoneId: (
      { commit }: ActionContext<AppState, StoreState>,
      activeZoneId: string
    ) => {
      /**
       * TODO: Aggiungere validazione:
       * - Validare active_zone_id rispetto alle zone ammesse dalla sessione (state.appState.zone_ids).
       * - Validare active_zone_id rispetto alle zone visibili (state.zones.zones).
       */
      console.log("setActiveZoneId", activeZoneId);
      commit("SET_APP_STATE", { active_zone_id: activeZoneId });
    },
    setActiveAvId: (
      { commit }: ActionContext<AppState, StoreState>,
      activeAvId: string
    ) => {
      commit("SET_APP_STATE", { active_av_id: activeAvId });
    },
  },
};
