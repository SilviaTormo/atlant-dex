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
          ChangeName
        .accountInfo__item
          .accountInfo__param Verification status:
          .accountInfo__value.accountInfo__value--inline
            Icon.accountInfo__star(id="star" v-for="(index) in 5", :class="{'accountInfo__star--verified' : index <= account.verificationRating }", :key="index")
            .accountInfo__rating {{account.verificationRating}}/5
            .link.accountInfo__action Finish process
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
            Checkbox.accountInfo__checkbox(v-model="account.subscribe.newsletter") #[.accountInfo__text Email newsletter]
            Checkbox.accountInfo__checkbox(v-model="account.subscribe.email") #[.accountInfo__text Email notification]
            Checkbox.accountInfo__checkbox(v-model="account.subscribe.sms") #[.accountInfo__text SMS notification]
          .accountInfo__item.accountInfo__item--other
            .accountInfo__param Preferred currency:
            .accountInfo__value.accountInfo__value--inline {{getCountryCurrency}}
              FlagSwitch.accountInfo__dropdown(type="currency", :value="getCurrencyCountry", @change="val => { setPrefCurrencyFromFlag(val) }")
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
import ChangeName from './ChangeName';
import ChangePhone from './ChangePhone';
import Page from './Page';

export default {
  data() {
    return {
    };
  },
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
    ChangeName,
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
    color: #054465;
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
    width: 40px;
    margin-left: 10px;
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
