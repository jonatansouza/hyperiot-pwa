export interface DeviceModel {
  id: string;
  mode: string;
  ownerId: string;
  permission: number;
  requester: string;
  sharedWith: string;
  updated: number;
  cleanId?: string;
  sharedDataDescription?: string;
  sharedWithArr?: string[];
  bucket?: string;
  resourceLocation: string;
}
