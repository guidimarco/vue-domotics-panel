/**
 * NavConfig:
 * @param {string} id: unique identifier
 * @param {string} label: displayed text
 * @param {string} icon: icon to display
 * @param {string} path: route path
 */
export interface NavConfig {
  id: string;
  routeName: string;
  label: string;
  icon: string;
  needZoneId: boolean;
  module?: string;
  adminOnly?: boolean;
}

export const navConfig: Array<NavConfig> = [
  {
    id: "home",
    routeName: "home",
    label: "Home",
    icon: "home",
    needZoneId: false,
  },
  {
    id: "av",
    routeName: "av",
    label: "A/V",
    icon: "tv",
    module: "av",
    needZoneId: true,
  },
  {
    id: "lights",
    routeName: "lights",
    label: "Lights",
    icon: "lightbulb",
    module: "light",
    needZoneId: true,
  },
  {
    id: "hvac",
    routeName: "hvac",
    label: "HVAC",
    icon: "thermostat",
    module: "hvac",
    needZoneId: true,
  },
  {
    id: "settings",
    routeName: "settings",
    label: "Settings",
    icon: "settings",
    needZoneId: false,
    adminOnly: true,
  },
];
