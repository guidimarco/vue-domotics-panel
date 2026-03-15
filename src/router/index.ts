import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import HomeView from "../views/HomeView.vue";
import SettingsView from "../views/SettingsView.vue";
import AvView from "../views/AvView.vue";
import LightsView from "../views/LightsView.vue";
import HvacView from "../views/HvacView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
    meta: {
      icon: "settings",
      label: "Impostazioni",
    },
  },
  {
    path: "/zones/:zoneId",
    name: "zone",
    component: { render: (h: any) => h("router-view") },
    redirect: { name: "home" },
    children: [
      {
        path: "av",
        name: "av",
        component: AvView,
      },
      {
        path: "lights",
        name: "lights",
        component: LightsView,
      },
      {
        path: "hvac",
        name: "hvac",
        component: HvacView,
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.onError((error) => {
  console.error(error);
  router.push("/");
});

export default router;
