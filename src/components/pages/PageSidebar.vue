<template lang="pug">
.pageSidebar
  ul.pageSidebar__list
    li.pageSidebar__item(
      v-for="{name, label} in items",
      :class="{'pageSidebar__item--selected': isPageOpened(name)}",
      @click="openPage({name})"
    )
      Icon.pageSidebar__icon(id="triangle2" v-if="isPageOpened(name)")
      span.pageSidebar__label {{label}}
  ul.pageSidebar__mobileList(
    :class="{'pageSidebar__mobileList--selected': showNav}",
    @click="toggleNav"
  )
    .pageSidebar__navHeader Profile #[Icon.pageSidebar__navIcon(:class="{'pageSidebar__navIcon--show' : showNav}" id="arrow_angle")]
    //- li.pageSidebar__mobileItem(
    //-   :class="{'pageSidebar__mobileItem--selected': selectedCat == cat}",
    //-   v-for="cat in categories"
    //-   @click="unhideCategory(cat)"
    //- ) {{cat}}
    .pageSidebar__mobileSubItem(
      v-show="showNav"
      :class="{'pageSidebar__mobileSubItem--selected': isPageOpened(name)}",
      v-for="{name, label} in items",
      @click="openMobilePage({name})"
    ) {{label}}
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import {profileSections} from '@/config';
import Icon from '../Icon';

export default {
  data() {
    return {
      items: [],
      // categories: [
        // 'user info',
        // 'transaction history',
        // 'my orders',
        // 'security',
      // ],
      showNav: true,
    };
  },
  computed: {
    ...mapState('page', {
      pageName: 'name',
    }),
    ...mapGetters('page', {
      isPageOpened: 'isOpened',
    }),
    selectedCat() {
      return this.items.find((item) => item.name == this.pageName).category;
    },
  },
  methods: {
    ...mapMutations('page', {
      openPage: 'open',
    }),
    scrollToMethods() {
      this.$nextTick(() => {
        const headerHeight = document.querySelector('.header').getBoundingClientRect().height;
        const scrollY = document.querySelector('.page__content').getBoundingClientRect().top;
        window.scrollTo(0, scrollY - headerHeight);
      });
    },
    toggleNav() {
      this.showNav = !this.showNav;
    },
    openMobilePage(param) {
      this.openPage(param);
      this.scrollToMethods();
    },
  },
  created() {
    this.items = profileSections;
    this.openCat = this.selectedCat;
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
  height: 100%;
  border-right: 1px solid $color_tangaroa;
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
  &__mobileList {
    display: none;
  }
}
</style>
