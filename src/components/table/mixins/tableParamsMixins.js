export const TableParamsMixins = {
  props: {
    height: [
      String,
      Number,
    ],
    border: Boolean,
    rowKey: [
      String,
      Function,
    ],
    showHeader: {
      type: Boolean,
      default: true,
    },
    emptyText: String,
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};