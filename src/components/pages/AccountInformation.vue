<template lang="pug">
Page(title="Account", title2="account information", :sidebar="true")
  .accountInfo
    Icon.accountInfo__iconMain(id="account")
    .accountInfo__main
      .accountInfo__item
        .accountInfo__param Account ID:
        .accountInfo__value.accountInfo__value--fullWidth {{id}} #[span.accountInfo__registration Registration date: {{regdate}}]
      .accountInfo__item
        .accountInfo__param Full name:
        .accountInfo__value.accountInfo__value--verifiable {{name.value}} #[Icon.accountInfo__icon(v-if="name.verified" id="verified")]
      .accountInfo__item
        .accountInfo__param Verification status:
        .accountInfo__value.accountInfo__value--verifiable
          Icon.accountInfo__star(id="star" v-for="(index) in 5", :class="{'accountInfo__star--verified' : index <= rating }", :key="index")
          .accountInfo__rating {{rating}}/5
          .accountInfo__action Finish process
      .accountInfo__item
        .accountInfo__param Email:
        .accountInfo__value.accountInfo__value--verifiable {{email.value}} #[Icon.accountInfo__icon(v-if="email.verified" id="verified")]
          .accountInfo__action Change
      .accountInfo__item
        .accountInfo__param Phone number:
        .accountInfo__value.accountInfo__value--verifiable {{phone.value}} #[Icon.accountInfo__icon(v-if="phone.verified" id="verified")]
          .accountInfo__action Change
</template>

<script>
import Icon from 'components/Icon';
import Page from './Page';

export default {
  data() {
    return {
      id: '15354422#565s888',
      regdate: '17.02.2026',
      name: {
        value: 'Julian Denisovich Oekenov',
        verified: true,
      },
      email: {
        value: '****ize@atlant.io',
        verified: true,
      },
      phone: {
        value: '+7 965 296 36 36',
        verified: true,
      },
      rating: 3,
    };
  },
  components: {
    Page,
    Icon,
  },
};
</script>


<style lang="scss">
@import "~sass/bootstrap/media";

.accountInfo {
  display: flex;
  max-width: 550px;
  &__main {
    width: 100%;
  }
  &__item {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 43px;
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
      justify-content: space-between;
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
  }
}
</style>
