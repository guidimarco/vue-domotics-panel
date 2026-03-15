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
    needZoneId: true,
  },
  {
    id: "lights",
    routeName: "lights",
    label: "Lights",
    icon: "lightbulb",
    needZoneId: true,
  },
  {
    id: "hvac",
    routeName: "hvac",
    label: "HVAC",
    icon: "thermostat",
    needZoneId: true,
  },
  {
    id: "settings",
    routeName: "settings",
    label: "Settings",
    icon: "settings",
    needZoneId: false,
  },
];
