<template lang="pug">
.pageSidebar
  ul.pageSidebar__list
    li.pageSidebar__item(
      v-for="{name, label} in items",
      :class="{'pageSidebar__item--selected': isPageOpened(name)}",
      @click="openPage({name})"
    )
      Icon.pageSidebar__icon(id="triangle2" v-if="isPageOpened(name) && !isMobile")
      span.pageSidebar__label {{label}}
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import Icon from '../Icon';

export default {
  data() {
    return {
      items: [
        {
          name: 'accountinformation',
          label: 'Account information',
        },
        {
          name: 'verification',
          label: 'Verification',
        },
        {
          name: 'generalsettings',
          label: 'General settings',
        },
        {
          name: 'changePassword',
          label: 'Password',
        },
        {
          name: 'securitySettings',
          label: 'Security settings',
        },
        {
          name: 'securityLog',
          label: 'Security log',
        },
        {
          name: 'faq',
          label: 'FAQ',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('page', {
      isPageOpened: 'isOpened',
    }),
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
  },
  methods: {
    ...mapMutations('page', {
      openPage: 'open',
    }),
  },
  components: {
    Icon,
  },
};
</script>


<style lang="scss">
@import "~variables";
@import "~sass/bootstrap/media";

.pageSidebar {
  padding: 36px;
  border-right: 1px solid $color_tangaroa;
  height: 100%;
  &__list {
    list-style: none;
  }
  &__item {
    position: relative;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
    &--selected, &:hover {
      color: $color_yellow;
    }
  }
  &__icon {
    $size: 16px;
    width: $size;
    height: $size;
    fill: $color_yellow;
    position: absolute;
    transform: rotate(270deg);
    left: -22px;
  }
  &__label {
  }
}

@include media-breakpoint-down(md) {
  .pageSidebar {
    &__list {
      border: 1px solid #032537;
    }

    &__item {
      text-align: center;
    }
  }
}
</style>
