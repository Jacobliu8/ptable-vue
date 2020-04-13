import PTableColumn from './src/TableColumn';

PTableColumn.install = function (Vue) {
  Vue.component(PTableColumn.name, PTableColumn);
};

export default PTableColumn;