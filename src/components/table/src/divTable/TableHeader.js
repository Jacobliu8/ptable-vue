export default {
  name: 'TableHeader',

  component: {},

  mixins: [],

  render (h) {
    const headers = [];
    const headerCols = [];
    for (const column of this.columns) {
      headers.push(column.renderHeader(h, column.title));
      headerCols.push(h('div', {
        display: 'table-column',
        width: '100px',
      }));
    }
    return h('div', {
      style: {
        display: 'table',
      },
    }, [
      h('div', {
        style: {
          display: 'table-column-group',
        },
      }, headerCols),
      h('div', {
        style: {
          display: 'table-header-group',
        },
      }, headers),
    ]);
  },

  props: {
    store: {
      required: true,
    },
  },

  computed: {
    table () {
      return this.$parent;
    },
    columns: function () {
      return this.store.state.originColumns;
    },
  },

  methods: {},
};
