import {TableColumnParamsMixins} from '../mixins/tableColumnParamsMixins';
import {getComponentId} from '../../../../utils/IdentifyUtils';
import {INSERT_COLUMN} from '../store/columnStore';

export default {
  name: 'PTableNativeColumn',

  mixins: [
    TableColumnParamsMixins,
  ],

  props: {
    store: Object,
  },

  computed: {
    owner () {
      let parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    },
  },

  methods: {
    getPropsData () {
      const props = {};
      for (const key in TableColumnParamsMixins.props) {
        props[key] = this[key];
      }
      return props;
    },
  },

  created () {
    this.columnId = getComponentId(this.name);
    const column = this.getPropsData();
    column.renderHeader = (h, value) => {
      return h('th', {
        class: 'ptable-native-table-theader',
      }, value);
    };
    column.renderCell = (h, value) => {
      return h('td', {
        class: 'ptable-native-table-tcell',
      }, value);
    };
    this.owner.store.commit(INSERT_COLUMN, {column});
  },

  render (h) {
    return h('div', this.$slots.default);
  },
};
