<template lang="pug">
.panel(:class="{'panel--active': isCheckedArray, 'panel__scrollbarOpened' : showSidebar}")
  .panel__actions.panel__checkbox
    Checkbox.tHistory__checkbox(:value="isAllChecked" @change="toggleCheckboxes")
  .panel__actions Repeat
  .panel__actions Undo
  .panel__actions Delete
  .panel__actions Export
</template>

<script>
import Checkbox from '@/components/Checkbox';

export default {
  data() {
    return {
    };
  },
  props: {
    isAllChecked: {
      type: Boolean,
      required: true,
    },
    isCheckedArray: {
      type: Boolean,
      required: true,
    },
    toggleCheckboxes: {
      type: Function,
      required: true,
    },
    showSidebar: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Checkbox,
  },
};
</script>


<style lang="scss" scoped>
@import '~@/sass/bootstrap/media';
.panel {
  $panelHeight: 58px;
  z-index: 1.6;
  position: fixed;
  display: flex;
  align-items: center;
  padding-left: 41px;
  height: $panelHeight;
  left: 55px;
  right: 0;
  bottom: -$panelHeight;
  overflow: hidden;
  background-image: repeating-linear-gradient(
    135deg,
    #103c55,
    #103c55 25px,
    #03324c 0,
    #03324c 60px
  );
  transition: bottom .5s, left .15s;
  &--active {
    transition: bottom .5s;
    bottom: 0px;
  }
  &__actions {
    cursor: pointer;
    margin-right: 40px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 700;
  }
  &__scrollbarOpened {
    transition: left .15s;
    left: 335px;
  }
}
</style>
