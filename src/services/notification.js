import Noty from 'noty';
import i18n from 'i18n';
import store from '@/store';
import {serverCodes} from './serverCodes';

window.i18n = i18n;

export const getServerErrorText = (responseData) => {
  if (i18n.te(`serverErrors.${responseData.status}`)) {
    return i18n.t(`serverErrors.${responseData.status}`);
  } else if (responseData.description) {
    return responseData.description;
  } else {
    return 'Something wrong';
  }
};

export const notification = ({title = '', text, type = 'info'}) => {
  let errorTag = '';
  if (type === 'error') {
    errorTag = `<b style="color:red;">Error. </b>`;
  };
  new Noty({
    text: `${errorTag}<b>${title}</b> ${text}`,
    type: 'info',
    layout: store.getters['misc/isMobile'] ? 'bottomCenter' : 'topRight',
    closeWith: ['click', 'button'],
    progressBar: false,
    timeout: 3000,
  }).show();
};

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

export const serverNotification2 = (response) => {
  const {data} = response;
  if (response.status >= 400) {
    const type = 'error';
    notification({
      text: getServerErrorText(data),
      type,
    });
  }
};

export const notificationType = (level) => {
  switch (level) {
    case 0: return 'info';
    case 1: return 'warning';
    case 2: return 'error';
  }
};

export const getSignalRNotification = (type) => {
  switch (type) {
    case 1: return 'loggedIn';
    case 2: return 'tfaEnabled';
    case 3: return 'tfaDisabled';
    case 6: return 'upgradeTier';
    case 7: return 'orderPlaced';
    case 8: return 'orderPartiallyFilledSell';
    case 9: return 'orderFilledSell';
    case 10: return 'orderPartiallyFilledBuy';
    case 11: return 'orderFilledBuy';
  };
};
