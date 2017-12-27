<template lang="pug">
.pageSidebar
  ul.pageSidebar__list
    li.pageSidebar__item(
      v-for="{name, label} in items",
      :class="{'pageSidebar__item--selected': isPageOpened(name)}",
      @click="openPage({name})"
    )
      Icon.pageSidebar__icon(id="triangle2" v-if="isPageOpened(name)")
      .pageSidebar__label {{label}}
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
          name: 'password',
          label: 'Password',
        },
        {
          name: 'securitysettings',
          label: 'Security settings',
        },
        {
          name: 'securitylog',
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
.pageSidebar {
  padding: 36px;
  border-right: 1px solid $color_tangaroa;
  &__list {
    list-style: none;
  }
  &__item {
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 700;
    cursor: pointer;
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
}
</style>
