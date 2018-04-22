<template lang="pug">
Page(title="Account information", title2="", :sidebar="true")
  .accountInfo
    .accountInfo__title General information
    .accountInfo__content
      Icon.accountInfo__iconMain(id="account")
      .accountInfo__main
        .accountInfo__item
          .accountInfo__param Account ID:
          .accountInfo__value.accountInfo__value--fullWidth
            .accountInfo__value--half {{account.id}}
            span.accountInfo__registration Registration date: {{regdate}}
        .accountInfo__item(v-if="account.fullName.value")
          .accountInfo__param Full Name:
          .accountInfo__value.accountInfo__value--fullWidth
            .accountInfo__value {{account.fullName.value}}
        .accountInfo__item
          .accountInfo__param Verification status:
          .accountInfo__value.accountInfo__value--inline
            .accountInfo__rating(v-show="account.verificationRating") Tier {{account.verificationRating}}
            .link.accountInfo__action(v-show="account.verificationRating < 3 || typeof account.verificationRating == 'undefined'" @click="openPage({name: 'verification'})") Upgrade
        .accountInfo__item
          .accountInfo__param Email:
          .accountInfo__value.accountInfo__value--inline {{account.email.value}} #[Icon.accountInfo__icon(v-if="account.email.verified" id="verified")]
        .accountInfo__item
          ChangePhone
          //- .accountInfo__value.accountInfo__value--inline {{phone}} #[Icon.accountInfo__icon(v-if="account.phone.verified" id="verified")]
        .accountInfo__title Other
        .accountInfo__other
          .accountInfo__item.accountInfo__item--other
            .accountInfo__param I would like to receive:
            Checkbox.accountInfo__checkbox(
              :value="account.subscribe.newsletter",
              @change="setNewsletterSubscription"
            ) #[.accountInfo__text Email newsletter]
            Checkbox.accountInfo__checkbox(v-model="account.subscribe.email") #[.accountInfo__text Email notification]
            Checkbox.accountInfo__checkbox(v-model="account.subscribe.sms") #[.accountInfo__text SMS notification]
          .accountInfo__item.accountInfo__item--other
            .accountInfo__param Preferred currency:
            .accountInfo__value.accountInfo__value--inline
              FlagSwitch.accountInfo__dropdown(
                type="currency",
                :value="getCurrencyCountry",
                @input="setPrefCurrencyFromFlag"
              )
        BButton.accountInfo__button(color="malachite" rounded) Save
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import {getCountryByCurrency, getCountryCurrency} from 'services/countries';
import Icon from 'components/Icon';
import Checkbox from 'components/Checkbox';
import BButton from 'components/BButton';
import FlagSwitch from 'components/FlagSwitch';
import ChangePhone from './ChangePhone';
import Page from './Page';

export default {
  computed: {
    ...mapState('user', {
      account: 'account',
    }),
    regdate() {
      return DateTime.fromISO(this.account.regDate).toFormat('dd.LL.yyyy');
    },
    getCurrencyCountry() {
      return getCountryByCurrency(this.account.currency);
    },
    getCountryCurrency() {
      return getCountryCurrency(this.getCurrencyCountry);
    },
  },
  methods: {
    ...mapActions('user', [
      'setPreferredCurrency',
      'setNewsletterSubscription',
    ]),
    ...mapActions('user', [
      'getProfileData',
    ]),
    ...mapMutations('page', {
      openPage: 'open',
    }),
    setPrefCurrencyFromFlag(value) {
      this.setPreferredCurrency(getCountryCurrency(value));
    },
  },
  created() {
    this.getProfileData();
  },
  components: {
    Page,
    Icon,
    Checkbox,
    BButton,
    FlagSwitch,
    ChangePhone,
  },
};
</script>


<style lang="scss">
@import "~sass/bootstrap/media";

.accountInfo {
  max-width: 600px;
  &__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    text-transform: uppercase;
    margin-bottom: 40px;
  }
  &__content {
    display: flex;
  }
  &__main {
    width: 100%;
  }
  &__item {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 43px;
    &--other {
      width: 50%;
    }
  }
  &__param {
    font-weight: 700;
  }
  &__value {
    margin-top: 18px;
    font-weight: 400;
    &--inline {
      display: flex;
      align-items: center;
    }
    &--fullWidth {
      display: flex;
      align-items: center;
    }
    &--half{
      width: 50%;
    }
  }
  &__registration {
    color: #fff; // #054465;
  }
  &__action {
    margin-left: 19px;
  }
  &__icon{
    $size: 13px;
    height: $size;
    width: $size;
    margin-left: 14px;
  }
  &__iconMain {
    $size: 44px;
    height: $size;
    width: $size;
    margin-right: 38px;
    margin-bottom: 40px;
  }
  &__rating {
    min-width: 60px;
    border-radius: 2px;
    padding: 3px 8px;
    background-color: #ffc600;
    color: #032f47;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 900;
    line-height: 19px;
    text-transform: uppercase;
  }
  &__checkbox {
    margin-top: 20px;
  }
  &__text {
    margin-left: 15px;
  }
  &__other {
    display: flex;
    align-items: flex-start;
  }
  &__button {
    padding: 8px 44px;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    margin-top: 20px;
  }
  &__dropdown {
    width: 40px;
    margin-left: 10px;
  }
}

@include media-breakpoint-down(md) {
  .accountInfo {
    &__content {
      display: block;
    }
    &__iconMain {
      // display: none;
    }
    &__value {
      &--fullWidth {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    &__registration {
      margin-top: 42px;
    }
    &__item {
      &--other {
        width: 100%;
      }
    }
    &__other {
      flex-direction: column;
    }
  }
}
</style>
