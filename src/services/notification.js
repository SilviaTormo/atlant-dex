import Noty from 'noty';
import {serverCodes} from './serverCodes';

export const notification = ({title = '', text, type = 'info'}) => new Noty({
  text: `<b>${title}</b> ${text}`,
  type,
  layout: 'topRight',
  closeWith: ['click', 'button'],
  progressBar: false,
  timeout: 3000,
}).show();

export const serverNotification = (response) => {
  const {data: {code}, status} = response;
  let alias = '';
  let type = '';

  if (status === 401) {
    alias = 'Session Timed Out';
    type = 'error';
  } else {
    const message = serverCodes[code];
    alias = (message) ? message.name : ``;
    type = (message) ? message.type : 'error';
  }

  notification({
    title: `Code #${code}: `,
    text: alias,
    type,
  });
};

export const notificationType = (level) => {
  switch (level) {
    case 0: return 'info';
    case 1: return 'warning';
    case 2: return 'error';
  }
};
