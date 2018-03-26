// import {hubConnection} from 'signalr-no-jquery';

export default {
  install(Vue, {url, name}) {
    const signalR = require('@aspnet/signalr');
    let connection = new signalR.HubConnection(url);
    Vue.prototype.$hub = {
      connection,
      // proxy: null,
      // init() {
      //   this.proxy = connection.createHubProxy(name);
      //   connection.logging = false;
      //   connection.disconnected(() => {
      //     return this.start();
      //   });
      // },
      start() {
        return new Promise((resolve, reject) => {
          this.connection.start().done((status) => {
            return resolve(status);
          }).fail((error) => {
            return reject(error);
          });
        });
      },
    };
  },
};
