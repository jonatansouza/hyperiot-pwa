export class DeviceHelper {
  public static parseId(id: string) {
    return id.split('-')[1];
  }
  public static toArr(str: string) {
    return (str && str.length) ? str.split(',') : [];
  }
}
