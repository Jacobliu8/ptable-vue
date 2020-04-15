import Vuex from 'vuex';

export const createStore = () => {
  const store = new Vuex.Store({
    state: {
      columns: [],
      data: [],
    },
    mutations: {
      insertColumn (state, column, index) {
        let array = state.columns;
        if (typeof index !== 'undefined') {
          array.splice(index, 0, column);
        }
        else {
          array.push(column);
        }
      },
      setData (state, data) {
        state.data = data;
      },
    },
  });
  return store;
};
