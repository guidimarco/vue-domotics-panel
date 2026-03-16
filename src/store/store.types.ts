import { Device, Zone } from "@/types/app.types";

export interface StoreState {
  appState: AppState;
  settingsStore: SettingsStore;
  zonesStore: ZonesStore;
  modalStore: ModalStore;
}

export interface AppState {
  user_role: string;
  unit_id: string;
  brand: string;
  zone_ids: string[];
  active_zone_id: string | null;
  enabled_modules: string[];
  active_av: Device | null;
  loading_av: boolean;
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

export interface ModalData {
  modalId: string | null;
  component: string | null;
  props: object;
}

export interface ModalStore extends ModalData {
  showModal: boolean;
}
