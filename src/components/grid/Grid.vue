<template lang="pug">
.grid
  UserVisibility(hide-on-logout)
    .grid__edit(@click="setIsEdit", v-show="!isMobile") Edit
  GridPanel(:data="getHiddenLayout", :isEdit="isEdit", v-show="!isMobile")
  GridLayout(
    :layout="(isMobile ? mobileGridData : gridData)",
    :col-num="12",
    :row-height="60",
    :is-draggable="isEdit",
    :is-resizable="isEdit",
    :vertical-compact="true",
    :margin="[0, 0]",
    :use-css-transforms="true",
    @layout-updated="layoutUpdatedEvent",
    )
    GridItem(
      v-for="(item, index) in (isMobile ? mobileGridData : gridData)",
      :key="index",
      :x="item.x",
      :y="item.y",
      :w="item.w",
      :h="item.h",
      :i="item.i",
      :minW="item.minW",
      :minH="item.minH",
      :maxH="item.maxH",
    )
      GridItems(
        :component="item.i",
        :index="index"
      )
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import {mapState, mapMutations, mapGetters} from 'vuex';
import UserVisibility from 'components/UserVisibility';
import GridItems from './GridItems';
import GridPanel from './GridPanel';

const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;

export default {
  computed: {
    ...mapState('grid', {
      allGridLayout: 'allGridLayout',
      gridData: 'gridData',
      mobileGridData: 'mobileGridData',
      isEdit: 'isEdit',
    }),
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
    ...mapGetters('grid', {
      getHiddenLayout: 'getHiddenLayout',
    }),
  },
  methods: {
    ...mapMutations('grid', {
      changeGrid: 'changeGrid',
      setIsEdit: 'setIsEdit',
    }),
    layoutUpdatedEvent(newLayout) {
      this.changeGrid(newLayout);
      // console.log('Updated layout: ', newLayout);
    },
  },
  components: {
    GridLayout,
    GridItem,
    GridItems,
    GridPanel,
    UserVisibility,
  },
};
</script>

<style lang="scss">
  .grid {
    margin: 0 1px;
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
