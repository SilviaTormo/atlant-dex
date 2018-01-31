<template lang="pug">
.grid
  .grid__edit(@click="setIsEdit", v-show="!isMobile") Edit
  GridPanel(:data="getHiddenLayout", :isEdit="isEdit", v-show="!isMobile")
  .grid-stack
    .grid-stack-item(
      v-for='(items in (isMobile ? defaultGridData : createDashbard)',
      :data-gs-id='items.id',
      :data-gs-autoPosition='items.autoPosition',
      :data-gs-x='items.x',
      :data-gs-y='items.y',
      :data-gs-width='items.width',
      :data-gs-height='items.height',
      :data-gs-min-width='items.minWidth',
      :data-gs-min-height='items.minHeight',
      :data-gs-max-height='items.maxHeight',
    )
      GridItems(:component="items.id")
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex';
import GridItems from './GridItems';
import GridPanel from './GridPanel';

export default {
  computed: {
    ...mapState('grid', {
      defaultGridData: 'defaultGridData',
      isEdit: 'isEdit',
    }),
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
    ...mapGetters('grid', {
      gridData: 'gridData',
      getHiddenLayout: 'getHiddenLayout',
    }),
    createDashbard() {
      return this.gridData;
    },
  },
  methods: {
    ...mapMutations('grid', {
      changeGrid: 'changeGrid',
      setIsEdit: 'setIsEdit',
    }),
    getEdit() {
      $('.grid-stack').data('gridstack').enableMove(this.isEdit);
      $('.grid-stack').data('gridstack').enableResize(this.isEdit);
    },
  },
  watch: {
    isEdit() {
      this.getEdit();
    },
  },
  mounted() {
    // Initial Gridstack
    $('.grid-stack').gridstack({
      width: 12,
      minWidth: 991,
      verticalMargin: 0,
      animate: true,
      acceptWidgets: '.grid-stack-item',
      removable: '.gridPanel',
      removeTimeout: 100,
      float: false,
      resizable: {
        handles: 'e, se, s, sw, w',
      },
    });

    this.getEdit();

    // Event listener for grid
    $('.grid-stack').on('change', function(event, items) {
      let changes = _.map($('.grid-stack .grid-stack-item:visible'), function(el) {
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
      console.log('grid change: ', changes);
      this.changeGrid(changes);
    }.bind(this));
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
