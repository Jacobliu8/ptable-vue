export default {
  name: 'PTableNativeHeader',

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
  },

  methods: {},

  render (h) {
    const headers = [];
    const headerCols = [];
    for (const column of this.columns) {
      headers.push(column.renderHeader(h, column.title));
      headerCols.push(h('col', {
        domProps: {
          width: '100px',
        },
      }));
    }
    return h('table', {
      class: 'ptable-native-table-header',
    }, [
      h('colgroup', {}, headerCols),
      h('thead', {}, headers),
    ]);
  },
};
