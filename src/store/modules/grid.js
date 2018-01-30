export default {
  state: {
    defaultData: [
      {id: 'buySell', x: 0, y: 0, width: 3, height: 7, minWidth: 2, minHeight: 7, maxHeight: 7},
      {id: 'chart', x: 3, y: 0, width: 9, height: 7, minWidth: 5, minHeight: 7},
      {id: 'history', x: 0, y: 7, width: 3, height: 8, minWidth: 3, minHeight: 2},
      {id: 'book', x: 3, y: 7, width: 5, height: 8, minWidth: 5, minHeight: 2},
      {id: 'orders', x: 9, y: 7, width: 4, height: 8, minWidth: 4, minHeight: 2},
    ],
    gridData: [],
  },
  actions: {
    // changeGrid({commit}, gridData) {
    //   commit('CHANGE_GRID', gridData);
    // },
  },
  mutations: {
    changeGrid(state, data) {
      state.gridData = data;
    },
  },
  getters: {
    gridData(state) {
      if (state.gridData.length) {
        state.gridData = state.defaultData;
      }
      return state.gridData;
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
