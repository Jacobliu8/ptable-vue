import Vuex from 'vuex';
import _ from 'lodash';

export const SET_DATA = 'setData';

export const INSERT_COLUMN = 'insertColumn';

export const update_Column = 'updateColumn';

export const createStore = () => {
  const store = new Vuex.Store({
    state: {
      originColumns: [],
      columns: [],
      data: [],
    },
    mutations: {
      [INSERT_COLUMN] (state, {column, index}) {
        let array = state.originColumns;
        if (!_.isNil(index)) {
          array.splice(index, 0, column);
        }
        else {
          array.push(column);
        }
      },
      [SET_DATA] (state, data) {
        state.data = data;
      },
      [update_Column] (state) {
        state.columns = state.originColumns;
      },
    },
  });
  return store;
};
