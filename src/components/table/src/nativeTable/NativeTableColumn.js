import {TableColumnParamsMixins} from '../mixins/tableColumnParamsMixins';
import {getComponentId} from '../../../../utils/IdentifyUtils';
import {INSERT_COLUMN} from '../store/columnStore';
import {
  PTABLE_CELL_CLASS,
  PTABLE_HEADER_CLASS,
} from '../constant';

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
    renderHeader (h, value) {
      return h('th', {
        class: PTABLE_HEADER_CLASS,
      }, value);
    },
    renderCell (h, value) {
      return h('td', {
        class: PTABLE_CELL_CLASS,
      }, value);
    },
  },

  created () {
    this.columnId = getComponentId(this.name);
    const column = this.getPropsData();
    column.renderHeader = this.renderHeader;
    column.renderCell = this.renderCell;
    this.columnConfig = column;
  },

  mounted () {
    this.owner.store.commit(INSERT_COLUMN, {
      column: this.columnConfig,
    });
  },

  render (h) {
    return h('div', this.$slots.default);
  },
};
