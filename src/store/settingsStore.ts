import { ActionContext } from "vuex";
import { StoreState, SettingsStore } from "./store.types";

// Mock Data
import unitJson from "@/db/unit.json";

export default {
  namespaced: true,
  state: () => ({
    sat: {
      options: unitJson.sat.options,
      default: unitJson.sat.default,
      selected: unitJson.sat.selected,
    },
  }),
  getters: {
    selectedSatOption: (state: StoreState) => state.settingsStore.sat.selected,
  },
  mutations: {
    SET_SETTINGS: (state: StoreState, payload: Partial<SettingsStore>) => {
      state.settingsStore = { ...state.settingsStore, ...payload };
    },
  },
  actions: {
    changeSelectedSat: (
      { commit }: ActionContext<StoreState, StoreState>,
      payload: Pick<SettingsStore, "sat">
    ) => {
      commit("SET_SETTINGS", payload);
    },
  },
};
