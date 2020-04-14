import {TableColumnParamsMixins} from '../../table/src/mixins/tableColumnParamsMixins';

let columnIdSeed = 1;

export default {
  name: 'TableColumn',

  mixins: [
    TableColumnParamsMixins,
  ],

  created () {
    const parent = this.columnOrTableParent;
    this.isSubColumn = this.owner !== parent;
    this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++;

    let column = {
      id: this.columnId,
      title: this.title,
      key: this.key,
      align: this.align,
      headerAlign: this.headerAlign,
      width: this.width,
      ellipsis: this.ellipsis,
      renderCell: null,
      renderHeader: null,
    };
    column.renderCell = (h, data) => {
      return h('div', {
        style: {
          display: 'table-cell',
        },
      }, data);
    };
    column.renderHeader = (h, data) => {
      return h('div', {
        style: {
          display: 'table-cell',
        },
      }, data);
    };
    this.columnConfig = column;
  },

  mounted () {
    this.owner.store.insertColumn(this.columnConfig);
  },

  data () {
    return {
      columnConfig: {},
      columnId: '',
    };
  },

  render (h) {
    return h('div', {
      style: {
        display: 'none',
      },
    }, [
      this.$slots.default,
    ]);
  },

  props: {},

  computed: {
    owner () {
      let parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    },
    columnOrTableParent () {
      let parent = this.$parent;
      while (parent && !parent.tableId && !parent.columnId) {
        parent = parent.$parent;
      }
      return parent;
    },
  },

  methods: {},
};
