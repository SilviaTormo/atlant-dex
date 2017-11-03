<template lang='pug'>
.toolbar
  .toolbar__main
    Icon.toolbar__icon(v-if='showSidebar', id='cross' @click='toggleSidebar')
    Icon.toolbar__icon(v-else, id='hamburger' @click='toggleSidebar')
    Icon.toolbar__icon(id='wallet' @click="openInDemo")
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
  padding: $default_spacing;
  background-color: $color_blue;
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
}

@include media-breakpoint-down(md) {
  .toolbar {
    flex-direction: row;
    &__main {
      display: flex;
    }
    &__icon {
      margin-bottom: 0 !important;
      &:not(:last-of-type) {
        margin-right: 32px;
      }
    }
  }
}
</style>
