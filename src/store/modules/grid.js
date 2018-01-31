export default {
  state: {
    defaultGridData: [
      {autoPosition: true, id: 'buySell', x: 0, y: 0, width: 3, height: 7, minWidth: 2, minHeight: 7, maxHeight: 7},
      {autoPosition: true, id: 'chart', x: 3, y: 0, width: 9, height: 7, minWidth: 5, minHeight: 7},
      {autoPosition: true, id: 'history', x: 0, y: 7, width: 3, height: 8, minWidth: 3, minHeight: 2},
      {autoPosition: true, id: 'book', x: 3, y: 7, width: 5, height: 8, minWidth: 5, minHeight: 2},
      {autoPosition: true, id: 'orders', x: 9, y: 7, width: 4, height: 8, minWidth: 4, minHeight: 2},
    ],
    gridData: [],
    isEdit: false,
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
    setIsEdit(state) {
      state.isEdit = !state.isEdit;
    },
    addGridLayout(state, data) {
      // state.gridData = state.gridData.filter((el) => {
      //   el.id != data;
      // });
    },
    removeGridLayout(state, data) {
      // state.gridData = state.gridData.filter((el) => {
      //   el.id != data;
      // });
    },
  },
  getters: {
    gridData(state) {
      if (state.gridData.length == 0) {
        state.gridData = state.defaultGridData;
      }
      return state.gridData;
    },
    getHiddenLayout(state) {
      return state.defaultGridData.filter((e) => state.gridData.findIndex((i) => i.id == e.id) === -1);
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
