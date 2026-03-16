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
    satOptions: (state: SettingsStore) => state.sat.options,
    selectedSatOption: (state: SettingsStore) => state.sat.selected,
  },
  mutations: {
    SET_SELECTED_SAT: (state: SettingsStore, newValue: string) => {
      state.sat.selected = newValue;
    },
  },
  actions: {
    changeSelectedSat: (
      { commit }: ActionContext<SettingsStore, StoreState>,
      newValue: string
    ) => {
      commit("SET_SELECTED_SAT", newValue);
    },
  },
};
