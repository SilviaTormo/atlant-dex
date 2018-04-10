<template lang="pug">
Page(title="Security settings", title2="Security settings" :sidebar="true")
  .securitySettings
    .securitySettings__title Main
    .securitySettings__item
      ChangePassword
    // .securitySettings__desktopRow
    .securitySettings__item
      ChangeEmail
      //-   .securitySettings__param Current Email:
      //-   .securitySettings__value.securitySettings__value--row {{email.value}} #[Icon.securitySettings__icon(v-if="email.verified" id="verified")]
      //-     .link.securitySettings__action Change
      //- .securitySettings__item.securitySettings__item--column
      //-   .securitySettings__param Additional Email:
      //-   .securitySettings__value.securitySettings__value--row {{additionalEmail.value}} #[Icon.securitySettings__icon(v-if="security.additionalEmail.verified" id="verified")]
      //-     .link.securitySettings__action Change
    .securitySettings__title 2 factor authentication
    TFASettings
    .securitySettings__title Other
    .securitySettings__item.securitySettings__desktopRow
      .securitySettings__row Terminate active sessions #[Icon.securitySettings__terminateIcon(id="terminate")]
      .link.securitySettings__action.securitySettings__action--mobileLeft Terminate
    BButton.accountInfo__button(color="malachite" rounded) Save
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Icon from 'components/Icon';
import BButton from 'components/BButton';
import ChangePassword from 'components/pages/ChangePassword';
import ChangeEmail from 'components/pages/ChangeEmail';
import TFASettings from 'components/pages/TFASettings';
// import {serverNotification} from 'services/notification';
import Page from './Page';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('user', {
      security: 'security',
    }),
  },
  methods: {
    ...mapActions('user', {
      getProfileData: 'getProfileData',
    }),
  },
  created() {
    this.getProfileData();
  },
  components: {
    Page,
    Icon,
    BButton,
    ChangePassword,
    ChangeEmail,
    TFASettings,
  },
};
</script>

<style lang="scss">
@import "~sass/bootstrap/media";

.securitySettings {
  max-width: 600px;
  &__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    text-transform: uppercase;
    margin-bottom: 40px;
  }
  &__desktopRow {
    display: flex;
    align-items: center;
  }
  &__row {
    display: flex;
  }
  &__item {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 43px;
    &--column {
      width: 50%;
    }
  }
  &__param {
    font-weight: 700;
  }
  &__value {
    margin-top: 18px;
    font-weight: 400;
    &--row {
      display: flex;
      align-items: center;
    }
  }
  &__action {
    margin-right: 5px;
    margin-left: 19px;
  }
  &__icon{
    $size: 13px;
    height: $size;
    width: $size;
    margin-left: 14px;
  }
  &__terminateIcon {
    height: 19px;
    width: 25px;
    margin-left: 16px;
  }
  &__button {
    padding: 8px 44px;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    margin-top: 20px;
  }
}

@include media-breakpoint-down(md) {
  .securitySettings {
    &__desktopRow {
      display: block;
    }
    &__item {
      &--column {
        width: 100%;
      }
    }
    &__action {
      &--mobileLeft {
        margin-left: 0;
        margin-top: 17px;
      }
    }
  }
}
</style>
