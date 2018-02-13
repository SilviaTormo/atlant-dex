import Noty from 'noty';
import {serverCodes, notificationTimeout} from 'config';
import store from 'store';

export const notification = ({text, type = 'info'}) => new Noty({
  text,
  type,
  layout: 'topRight',
  progressBar: false,
  timeout: notificationTimeout,
}).show();

export const serverNotification = (response) => {
  const {data: {code}, status} = response;
  let alias = '';
  let type = '';

  if (status === 401) {
    alias = 'sessionTimedOut';
    type = 'alert';
  } else {
    const message = serverCodes[code];
    alias = (message) ? message.name : 'ServerError';
    type = (message) ? message.type : 'error';
  }

  notification({
    text: store.getters['localization/getMessage'](alias),
    type,
  });
};
