<template lang="pug">
.gridPanel(:class="{'gridPanel--hidden': !isEdit}")
  .gridPanel__elements(
    v-for='item in data',
    @click="addGridLayout(item)",
  ) {{item.i}}
</template>

<script>
import {mapMutations} from 'vuex';
import Icon from '../Icon';

export default {
  methods: {
    ...mapMutations('grid', {
      addGridLayout: 'addGridLayout',
    }),
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
}
</style>
