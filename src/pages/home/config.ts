export class Config {
  ssid:string = 'your ssid';
  password:string = 'your p@$$vv0rD';
  security:string = 'WPA2-ASK';

  get(key) {
    return this[key];
  }
}