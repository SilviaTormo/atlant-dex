<template lang='pug'>
.toolbar
  .toolbar__group
    Icon.toolbar__icon(
      :id="(showSidebar) ? 'cross' : 'hamburger'",
      @click='toggleSidebar',
    )
    UserVisibility(
      v-for="section in sidebarSections",
      :key="section.name",
      :hide-on-logout="!section.isShowOnLogout"
    )
      Icon.toolbar__icon(
        :id="section.name",
        :class="isActive(section.name)",
        @click="setSection(section.name)",
      )
  .toolbar__group
    UserVisibility(hide-on-logout)
      .toolbar__iconWrap(@click="checkBeforeOpenPage('notificationHistory')")
        Icon.toolbar__icon(
          id='icon-notification',
          :class="{'toolbar__icon--active': (currentPage === 'notificationHistory')}",
        )
        .toolbar__notifications {{(notificationsCounter > 10) ? '9+' : notificationsCounter}}
    UserVisibility(hide-on-logout)
      Icon.toolbar__icon(
        id='user',
        @click="checkBeforeOpenPage('accountInformation')",
        :class="{'toolbar__icon--active': isProfilePageOpened}"
      )
    Icon.toolbar__icon(
      id='settings',
      @click="checkBeforeOpenPage('securitySettings')",
      :class="{'toolbar__icon--active': isSettingPageOpened}",
    )
    Icon.toolbar__icon(
      id='info',
      @click="getOpenPage('transactionHistory')",
      :class="{'toolbar__icon--active': isPageHistoryOpened}",
    )
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import {sidebarSections} from 'config';
import UserVisibility from './UserVisibility';
import Icon from './Icon';

export default {
  data() {
    return {
      sidebarSections,
    };
  },
  computed: {
    ...mapState('misc', [
      'showSidebar',
    ]),
    ...mapState('user', [
      'notificationsCounter',
    ]),
    ...mapGetters('misc', [
      'isMobile',
      'section',
    ]),
    ...mapGetters('membership', [
      'isLoggedIn',
    ]),
    ...mapGetters('page', [
      'currentPage',
      'isProfilePageOpened',
      'isSettingPageOpened',
      'isPageHistoryOpened',
    ]),
  },
  methods: {
    ...mapMutations('misc', [
      'toggleSidebar',
      'setSidebar',
      'setSection',
    ]),
    ...mapMutations('page', {
      openPage: 'open',
    }),
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    isActive(section) {
      return (section === this.section) ? 'toolbar__icon--active' : '';
    },
    checkBeforeOpenPage(pageName) {
      if (!this.isLoggedIn) {
        this.openModal({name: 'signIn'});
        return false;
      }
      this.getOpenPage(pageName);
    },
    getOpenPage(name) {
      this.openPage({name});
      if (this.isMobile) this.setSidebar(false);
    },
  },
  components: {
    Icon,
    UserVisibility,
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
  padding: 15px 0;
  background-color: $color_blue;
  background-image: linear-gradient(to top, #01253A 0%, #03354F 100%);
  border-left: 1px solid $color_tangaroa;
  z-index: 1;
  flex-shrink: 0;
  &__iconWrap {
    cursor: pointer;
    position: relative;
    margin-bottom: 32px;
  }
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
  &__notifications {
    position: absolute;
    top: -2px;
    right: -5px;
    background-color: #f33a3a;
    border-radius: 10px;
    padding: 1px 4px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 11px;
    font-weight: 900;
  }
}
</style>
