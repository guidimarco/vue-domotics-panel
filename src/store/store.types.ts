import { Device, Zone } from "@/types/app.types";

export interface StoreState {
  appState: AppState;
  settingsStore: SettingsStore;
  zonesStore: ZonesStore;
}

export interface AppState {
  user_role: string;
  unit_id: string;
  zone_ids: string[];
  active_zone_id: string;
  enabled_modules: string[];
  active_av_ids: string[];
}

export interface SettingsStore {
  sat: {
    options: string[];
    default: string;
    selected: string;
  };
}

export interface ZonesStore {
  zones: Zone[];
  zone_devices: Device[];
}
