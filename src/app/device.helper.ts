export class DeviceHelper {
  public static parseId(id: string) {
    return id.split('-')[1];
  }
  public static toArr(str: string) {
    return (str && str.length) ? str.split(',') : [];
  }
  public static isEmail(email) {
    // eslint-disable-next-line max-len
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public static methodName(method: string) {
    const methods = {
      createSharedData: 'Cadastro',
      grantAccess: 'Garantia de acesso',
      revokeAccess: 'Revogação acesso',
      requestPermission: 'Solicitação de Permissão'
    };
    return methods[method] || 'Desconhecido';
  }
}
