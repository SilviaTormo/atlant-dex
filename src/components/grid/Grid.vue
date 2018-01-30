<template lang="pug">
.grid
  .grid__edit(@click="isEdit = !isEdit") Edit
  GridPanel(:data="defaultGridLayout", :isEdit="isEdit", v-show="!isMobile")
  .grid-stack
    .grid-stack-item(
      v-for='(items in (isMobile ? defaultGridLayout : gridLayout)',
      :data-gs-id='items.id',
      :data-gs-x='items.x',
      :data-gs-y='items.y',
      :data-gs-width='items.width',
      :data-gs-height='items.height',
      :data-gs-min-width='items.minWidth',
      :data-gs-min-height='items.minHeight',
      :data-gs-max-height='items.maxHeight',
    )
      GridItems(v-bind:component="items.id")
</template>

<script>
// import $ from 'jquery';
// import 'jquery-ui';
// import 'lodash';
// import 'gridstack';
// import 'gridstack.jquery-ui';
import {mapState, mapMutations, mapGetters} from 'vuex';
import GridItems from './GridItems';
import GridPanel from './GridPanel';

export default {
  data() {
    return {
      hiddenLayout: [],
      isEdit: false,
    };
  },
  computed: {
    ...mapState('grid', {
      defaultGridLayout: 'defaultData',
    }),
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
    ...mapGetters('grid', {
      gridLayout: 'gridData',
    }),
    ...mapMutations('grid', {
      changeGrid: 'changeGrid',
    }),
  },
  methods: {
    getEdit() {
      $('.grid-stack').data('gridstack').enableMove(this.isEdit);
      $('.grid-stack').data('gridstack').enableResize(this.isEdit);
    },
    createArrayWithHiddenEl() {
      return this.hiddenLayout = this.defaultGridLayout.filter((e) => this.gridLayout.findIndex((i) => i.id == e.id) === -1);
    },
    changeGridLayout(array) {
      this.gridLayout = [];
      this.gridLayout = array;
    },
  },
  watch: {
    isEdit() {
      this.getEdit();
    },
    // gridLayout() {
    //   // console.log(this.gridLayout);
    //   // localStorage.setItem('gridLayout', JSON.stringify(this.gridLayout));
    //   this.createArrayWithHiddenEl();
    // },
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

    this.changeGrid('fuck');

    // Event listener for grid
    $('.grid-stack').on('change', function(event, items) {
      (_.map($('.grid-stack .grid-stack-item'), (el) => {
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
      }));
    });
  },
  created() {
    // this.gridLayout = (localStorage.gridLayout) ? JSON.parse(localStorage.gridLayout) : false || this.defaultGridLayout;
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
