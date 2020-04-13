import PTable from './src/Table';

PTable.install = function (Vue) {
  Vue.component(PTable.name, PTable);
};

export default PTable;