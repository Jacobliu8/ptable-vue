import Table from '../src/components/table/Table';


const install = function (Vue) {
  Vue.component(Table.name, Table);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.export = {
  install,
  Table,
};
