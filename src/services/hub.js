// import {hubConnection} from 'signalr-no-jquery';

export default {
  install(Vue, url, token) {
    const signalR = require('@aspnet/signalr');
    let connection = new signalR.HubConnection(`${url}?token=${token}`);
    Vue.prototype.$hub = connection;
    connection.on('Send', (data) => {
      console.log(data);
    });
    // {
      // proxy: null,
      // init() {
      //   this.proxy = connection.createHubProxy(name);
      //   connection.logging = false;
      //   connection.disconnected(() => {
      //     return this.start();
      //   });
      // },
      // start() {
      //   return new Promise((resolve, reject) => {
      //     this.connection.start().then((status) => {
      //       return resolve(status);
      //     }).fail((error) => {
      //       return reject(error);
      //     });
      //   });
      // },
    // };
  },
};
