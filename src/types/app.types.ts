export interface Zone {
  id: string;
  name: string;
  visible: boolean;
  devices: Device[];
}

export interface Device {
  id: string;
  type: "av" | "light" | "hvac";
  name: string;
  power: boolean;
  data: object;
}
