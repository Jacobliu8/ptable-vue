export default {
  name: 'PTableNativeBody',

  mixins: [],

  props: {
    store: {
      required: true,
    },
  },

  computed: {
    columns: function () {
      return this.store.state.originColumns;
    },
    data: function () {
      return this.store.state.data;
    },
  },

  methods: {},

  render (h) {
    const rows = [];
    const tableCols = [];
    for (const record of this.data) {
      const cells = [];
      for (const column of this.columns) {
        cells.push(column.renderCell(h, record[column.prop]));
        if (tableCols.length !== this.columns.length) {
          tableCols.push(h('col', {
            domProps: {
              width: '100px',
            },
          }));
        }
      }
      rows.push(h('tr', {}, cells));
    }
    return h('table', {
      class: 'ptable-native-table-body',
    }, [
      h('colgroup', {}, tableCols),
      h('tbody', {}, rows),
    ]);
  },
};
