<template lang='pug'>
.toolbar
  .toolbar__group
    Icon.toolbar__icon(:id="(showSidebar) ? 'cross' : 'hamburger'" @click='toggleSidebar')
    Icon.toolbar__icon(id='wallet' @click="openInDemo")
    Icon.toolbar__icon(id='alert' @click="openInDemo")
  .toolbar__group
    Icon.toolbar__icon(id='alert' @click="openInDemo")
    Icon.toolbar__icon(id='alert' @click="openInDemo")
    Icon.toolbar__icon(id='alert' @click="openInDemo")
    Icon.toolbar__icon(id='alert' @click="openInDemo")
  Icon.toolbar__icon(id='settings' @click="openInDemo")
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import Icon from './Icon';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
  },
  methods: {
    ...mapMutations('misc', {
      toggleSidebar: 'toggleSidebar',
    }),
  },
  components: {
    Icon,
  },
};

</script>

<style lang='scss'>
@import "~variables";
@import "~sass/bootstrap/media";

.toolbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 24px 0;
  background-color: $color_blue;
  background-image: linear-gradient(to bottom, #02324c 0, #011a29 100%);
  border-left: 1px solid $color_tangaroa;
  z-index: 1;
  flex-shrink: 0;
  &__icon {
    $size: 20px;
    height: $size;
    width: $size;
    fill: #fff;
    &:not(:last-of-type) {
      margin-bottom: 32px;
    }
    &:hover {
      cursor: pointer;
      fill: #e9bd24;
    }
  }
  &--fixed {

  }
}
</style>
