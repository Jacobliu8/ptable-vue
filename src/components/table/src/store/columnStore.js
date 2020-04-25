import Vuex from 'vuex';
import _ from 'lodash';

export const SET_DATA = 'setData';

export const INSERT_COLUMN = 'insertColumn';

export const UPDATE_COLUMN = 'updateColumn';

const getAllLeafChildren = columns => {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push.apply(result, getAllLeafChildren(column.children));
    }
    else {
      result.push(column);
    }
  });
  return result;
};

export const createStore = () => {
  const store = new Vuex.Store({
    state: {
      originColumns: [],
      columns: [],
      data: [],
    },
    mutations: {
      [INSERT_COLUMN] (state, {column, index, parent}) {
        let array = state.originColumns;
        if (parent) {
          array = parent.children;
          if (!array) array = parent.children = [];
        }
        if (!_.isNil(index)) {
          array.splice(index, 0, column);
        }
        else {
          array.push(column);
        }
        this.commit(UPDATE_COLUMN);
      },
      [SET_DATA] (state, data) {
        state.data = data;
      },
      [UPDATE_COLUMN] (state) {
        state.columns = getAllLeafChildren(state.originColumns);
      },
    },
    getters: {},
  });
  return store;
};
