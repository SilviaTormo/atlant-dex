import * as ContractApi from 'services/api/contract-api';

export default {
  state: {
    balance: 317,
    userCurrencies: ['USD', 'BTC', 'ETH', 'ATL'],
  },
  getters: {
  },
  mutations: {},
  actions: {
    getEthBalance({state}) {
      ContractApi.getEthBalance('0x372aebaed0c89eacf3bd8f7aef66bb4e5a0edfd1').then((res) => {
        state.balance = res;
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
