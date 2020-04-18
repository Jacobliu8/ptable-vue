import Vuex from 'vuex';
import _ from 'lodash';

export const createStore = () => {
  const store = new Vuex.Store({
    state: {
      originColumns: [],
      columns: [],
      data: [],
    },
    mutations: {
      insertColumn (state, column, index) {
        let array = state.originColumns;
        if (!_.isNil(index)) {
          array.splice(index, 0, column);
        }
        else {
          array.push(column);
        }
      },
      setData (state, data) {
        state.data = data;
      },
      updateColumn (state) {
        state.columns = state.originColumns;
      },
    },
  });
  return store;
};
