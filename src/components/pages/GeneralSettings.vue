<template lang="pug">
Page(title="General settings", :sidebar="true")
  .generalSettings__block
    .title TWO-FACTOR AUTHENTICATION
    .generalSettings__content
      Checkbox(v-model="use2FA")
        .generalSettings__text Use 2FA for account login
  .generalSettings__block
    .title.generalSettings__title E-MAIL NEWSLETTER
    .generalSettings__content
      Checkbox(v-model="subscribe")
        .generalSettings__text Subscribe to our e-mail newsletter
</template>

<script>
import Checkbox from 'components/Checkbox';
import Page from './Page';

export default {
  data() {
    return {
      use2FA: false,
      subscribe: false,
    };
  },
  components: {
    Page,
    Checkbox,
  },
};
</script>


<style lang="scss">
.generalSettings {
  &__block {
    margin-bottom: 67px;
  }
  &__content {
    margin-top: 42px;
  }
  &__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    margin-left: 20px;
  }
}
</style>
