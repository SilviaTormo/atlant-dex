<template lang="pug">
.gridPanel(:class="{'gridPanel--hidden': !isEdit}")
  .gridPanel__elements(v-for='items in data', @click="addBlock(items)") {{items.id}}
  .gridPanel__elements.gridPanel__panelTrash
    Icon(id="trash").gridPanel__panelTrash--icon
</template>

<script>
import Icon from '../Icon';

export default {
  methods: {
    addBlock(block) {
      let grid = $('.grid-stack').data('gridstack');
      grid.addWidget(`
        <div class="grid-stack-item">
          <div class="grid-stack-item-content ui-draggable-handle">
            block
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
    border-color: red;
    flex: 2;
    fill: red;
  }
}
</style>
