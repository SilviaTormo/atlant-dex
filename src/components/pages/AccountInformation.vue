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
        .accountInfo__item
          .accountInfo__param Full name:
          .accountInfo__value.accountInfo__value--verifiable {{name.value}} #[Icon.accountInfo__icon(v-if="name.verified" id="verified")]
        .accountInfo__item
          .accountInfo__param Verification status:
          .accountInfo__value.accountInfo__value--verifiable
            Icon.accountInfo__star(id="star" v-for="(index) in 5", :class="{'accountInfo__star--verified' : index <= account.verificationRating }", :key="index")
            .accountInfo__rating {{account.verificationRating}}/5
            .accountInfo__action Finish process
        .accountInfo__item
          .accountInfo__param Email:
          .accountInfo__value.accountInfo__value--verifiable {{account.email}} #[Icon.accountInfo__icon(v-if="account.isEmailConfirmed" id="verified")]
            .accountInfo__action Change
        .accountInfo__item
          .accountInfo__param Phone number:
          .accountInfo__value.accountInfo__value--verifiable {{phone.value}} #[Icon.accountInfo__icon(v-if="phone.verified" id="verified")]
            .accountInfo__action Change
        .accountInfo__title Other
        .accountInfo__other
          .accountInfo__item.accountInfo__item--other
            .accountInfo__param I would like to receive:
            Checkbox.accountInfo__checkbox(v-model="settings.receiveEmailNewsletter") #[.accountInfo__text Email newsletter]
            Checkbox.accountInfo__checkbox(v-model="settings.receiveEmailNotifications") #[.accountInfo__text Email notification]
            Checkbox.accountInfo__checkbox(v-model="settings.receiveSmsNotifications") #[.accountInfo__text SMS notification]
          .accountInfo__item.accountInfo__item--other
            .accountInfo__param Preferred currency:
            FlagSwitch.accountInfo__value.accountInfo__dropdown(type="currency", :value="getCurrencyCountry", @change="val => { setPrefCurrencyFromFlag(val) }")
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
import Page from './Page';

export default {
  data() {
    return {
      name: {
        value: 'Julian Denisovich Oekenov',
        verified: true,
      },
      phone: {
        value: '+7 965 296 36 36',
        verified: true,
      },
      // currency: 'us',
    };
  },
  computed: {
    ...mapState('user', {
      settings: 'settings',
      account: 'account',
    }),
    regdate() {
      return DateTime.fromISO(this.account.regDate).toFormat('dd.LL.yyyy');
    },
    getCurrencyCountry() {
      return getCountryByCurrency(this.settings.prefferedCurrency);
    },
  },
  methods: {
    ...mapMutations('user', {
      setPrefCurrency: 'setPrefCurrency',
    }),
    ...mapActions('user', {
      getProfileData: 'getProfileData',
    }),
    setPrefCurrencyFromFlag(value) {
      this.setPrefCurrency(getCountryCurrency(value));
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
    &--verifiable {
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
    color: #054465;
  }
  &__action {
    color: #ffc600;
    text-decoration: underline;
    margin-left: 19px;
    cursor: pointer;
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
  }
  &__star {
    $size: 11px;
    height: $size;
    width: $size;
    fill: #044568;
    margin-right: 5px;
    &--verified {
      fill: #ffc600;
    }
  }
  &__rating {
    margin-left: 5px;
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
    width: 75px;
  }
}

@include media-breakpoint-down(md) {
  .accountInfo {
    &__iconMain {
      display: none;
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
