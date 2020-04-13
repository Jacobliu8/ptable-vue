import PTable from './components/table/index';
import PTableColumn from './components/table-column/index';

const components = [
  PTable,
  PTableColumn,
];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const API = {
  install,
  ...components,
};

module.exports.default = module.exports = API;
