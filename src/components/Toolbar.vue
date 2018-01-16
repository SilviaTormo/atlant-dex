<template lang='pug'>
.toolbar
  .toolbar__group
    Icon.toolbar__icon(:id="(showSidebar) ? 'cross' : 'hamburger'" @click='toggleSidebar')
    Icon.toolbar__icon(v-for='sec in sections', :id="sec", :key="sec", :class="isActive(sec)", @click="setSection(sec)")
  .toolbar__group
    Icon.toolbar__icon(id='user' @click="getOpenPage('accountinformation')")
    Icon.toolbar__icon(id='settings' @click="getOpenPage('generalsettings')")
    Icon.toolbar__icon(id='info' @click="getOpenPage('transactionHistory')")
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import Icon from './Icon';

export default {
  data() {
    return {
      sections: [
        'wallet',
        'quotes',
        'alert',
      ],
    };
  },
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
      section: 'section',
    }),
  },
  methods: {
    ...mapMutations('misc', {
      toggleSidebar: 'toggleSidebar',
      setSection: 'setSection',
    }),
    ...mapMutations('page', {
      openPage: 'open',
    }),
    isActive(section) {
      return (section == this.section) ? 'toolbar__icon--active' : '';
    },
    getOpenPage(pageName) {
      this.openPage({
        name: pageName,
      });
    },
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
  background-image: linear-gradient(to top, #01253A 0%, #03354F 100%);
  border-left: 1px solid $color_tangaroa;
  z-index: 1;
  flex-shrink: 0;
  &__icon {
    $size: 20px;
    height: $size;
    width: $size;
    fill: #fff;
    &--active {
      fill: #e9bd24;
    }
    &:not(:last-of-type) {
      margin-bottom: 32px;
    }
    &:hover {
      cursor: pointer;
      fill: #e9bd24;
    }
  }
}
</style>
