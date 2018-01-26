<template lang="pug">
.grid
  .grid__edit(@click="isEdit = !isEdit") Edit
  GridPanel(:data="hiddenLayout", :isEdit="isEdit", v-show="!isMobile")
  .grid-stack
    .grid-stack-item(
      v-for='({id, x, y, width, height, minWidth, minHeight, maxHeight}, index) in (isMobile ? defaultGridLayout : gridLayout)',
      :data-gs-id='id',
      :data-gs-x='x',
      :data-gs-y='y',
      :data-gs-width='width',
      :data-gs-height='height',
      :data-gs-min-width='minWidth',
      :data-gs-min-height='minHeight',
      :data-gs-max-height='maxHeight',
    )
      GridItems(v-bind:component="id")
</template>

<script>
// import $ from 'jquery';
// import 'jquery-ui';
// import 'lodash';
// import 'gridstack';
// import 'gridstack.jquery-ui';
import {mapGetters} from 'vuex';
import GridItems from './GridItems';
import GridPanel from './GridPanel';

export default {
  data() {
    return {
      defaultGridLayout: [
        {id: 'buySell', x: 0, y: 0, width: 3, height: 7, minWidth: 2, minHeight: 7, maxHeight: 7},
        {id: 'chart', x: 3, y: 0, width: 9, height: 7, minWidth: 5, minHeight: 7},
        {id: 'history', x: 0, y: 7, width: 3, height: 8, minWidth: 3, minHeight: 2},
        {id: 'book', x: 3, y: 7, width: 5, height: 8, minWidth: 5, minHeight: 2},
        {id: 'orders', x: 9, y: 7, width: 4, height: 8, minWidth: 4, minHeight: 2},
      ],
      gridLayout: [],
      hiddenLayout: [],
      isEdit: false,
    };
  },
  computed: {
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
  },
  methods: {
    getEdit() {
      $('.grid-stack').data('gridstack').enableMove(this.isEdit);
      $('.grid-stack').data('gridstack').enableResize(this.isEdit);
    },
    createArrayWithHiddenEl() {
      this.hiddenLayout = this.defaultGridLayout.filter((e) => this.gridLayout.findIndex((i) => i.id == e.id) === -1);
      // console.log(this.hiddenLayout);
    },
  },
  watch: {
    isEdit() {
      this.getEdit();
    },
    gridLayout() {
      this.createArrayWithHiddenEl();
    },
  },
  mounted() {
    // Initial Gridstack
    $('.grid-stack').gridstack({
      width: 12,
      minWidth: 991,
      verticalMargin: 0,
      animate: true,
      // acceptWidgets: '.grid-stack-item',
      removable: '.gridPanel__panelTrash',
      removeTimeout: 100,
      float: false,
      resizable: {
        handles: 'e, se, s, sw, w',
      },
    });

    this.getEdit();

    // Add new block with dragable
    // $('.grid__panel .grid-stack-item').draggable({
    //   revert: true,
    //   handle: '.grid-stack-item-content',
    //   acceptWidgets: '.grid-stack-item',
    //   scroll: false,
    //   appendTo: '.grid-stack',
    //   helper: 'clone',
    // });

    // Event listener for grid
    $('.grid-stack').on('change', function(event, items) {
      this.gridLayout = _.map($('.grid-stack .grid-stack-item:visible'), function(el) {
        el = $(el);
        let node = el.data('_gridstack_node');
        return {
          id: node.id,
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          minWidth: node.minWidth,
          minHeight: node.minHeight,
          maxHeight: node.maxHeight,
        };
      });
      localStorage.setItem('gridLayout', JSON.stringify(this.gridLayout));
      // console.log(this.gridLayout);
    });
  },
  created() {
    this.gridLayout = (localStorage.gridLayout) ? JSON.parse(localStorage.gridLayout) : false || this.defaultGridLayout;
  },
  components: {
    GridItems,
    GridPanel,
  },
};
</script>

<style lang="scss">
  .grid {
    &__edit {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border: 1px solid rgb(24, 34, 53);
      border-radius: 50%;
      margin-bottom: 5px;
      &:hover {
        background: rgb(24, 34, 53);
      }
    }
  }
</style>
