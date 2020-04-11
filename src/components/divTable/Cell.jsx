import {DEFAULT_CELL_MIN_WIDTH} from './util/constants';
import _ from 'lodash';

export default {
    name: 'Cell',

    mixins: [],

    props: {
        content: String,
        align: {
            type: String,
            default: 'left',
        },
        className: String,
        width: Number,
        minWidth: {
            type: Number,
            default: DEFAULT_CELL_MIN_WIDTH,
        },
        ellipsis: Boolean,
        render: Function,
    },

    render(h) {
        if (this.render) {
            return this.render;
        }
        let cellStyle = {
            minWidth: this.minWidth,
            textAlign: this.align,
            display: 'table-cell',
        };
        if (this.ellipsis) {
            cellStyle = _.assign(cellStyle, {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            });
        }
        if (!_.isNil(this.width)) {
            cellStyle.width = this.width;
        }
        return (
            <div class={this.className} style={cellStyle}>content</div>
        );
    },

    computed: {},

    methods: {},

};
