<template lang="pug">
.gridPanel(:class="{'gridPanel--hidden': !isEdit}")
  .grid-stack-item.gridPanel__elements(
    v-for='items in data',
    @click="addBlock(items)",
    :data-gs-id='items.id',
    :data-gs-x='items.x',
    :data-gs-y='items.y',
    :data-gs-width='items.width',
    :data-gs-height='items.height',
    :data-gs-min-width='items.minWidth',
    :data-gs-min-height='items.minHeight',
    :data-gs-max-height='items.maxHeight',
  )
    .grid-stack-item-content {{items.id}}
  .gridPanel__elements.gridPanel__panelTrash
    Icon(id="trash").gridPanel__panelTrash--icon
</template>

<script>
import Icon from '../Icon';

export default {
  methods: {
    addBlock(block) {
      $('.grid-stack').data('gridstack').addWidget(`
        <div class="grid-stack-item ui-draggable">
          <div class="grid-stack-item-content">
          </div>
        </div>`, // el
        block.x, // x
        block.y, // y
        block.width, // width
        block.height, // height
        true, // autoposition
        block.minWidth, // minWidth
        block.maxWidth, // maxWidth
        block.minHeight, // minHeight
        block.maxHeight, // maxHeight
        block.id, // id
      );
    },
  },
  watch: {
    data() {
      // console.log(this.data);
    },
  },
  mounted() {
    // Add new block with dragable
    // $('.gridPanel .grid-stack-item').draggable({
    //   revert: true,
    //   handle: '.grid-stack-item-content',
    //   // acceptWidgets: '.gridPanel',
    //   scroll: false,
    //   appendTo: '.grid-stack',
    //   helper: 'clone',
    // });
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
.gridPanel {
  display: flex;
  justify-content: space-between;
  &--hidden {
    width: 0;
    height: 0;
    overflow: hidden;
  }
  &__elements {
    max-width: 270px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 40px;
    margin: 15px;
    border: 2px dashed green;
    border-radius: 10%;
  }
  &__panelTrash {
    margin-left: auto;
    border-color: red;
    flex: 2;
    fill: red;
  }
}
</style>
