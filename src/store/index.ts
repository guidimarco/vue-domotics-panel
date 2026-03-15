import Vue from "vue";
import Vuex from "vuex";

import appStateStore from "./appStateStore";
import settingsStore from "./settingsStore";
import zonesStore from "./zonesStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appState: appStateStore,
    settingsStore: settingsStore,
    zonesStore: zonesStore,
  },
});
