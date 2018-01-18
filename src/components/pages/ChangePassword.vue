<template lang="pug">
Page(title="Password", title2="Change password", :sidebar="true")
  .changePassword
    .changePassword__main
      .changePassword__block
        IInput.changePassword__input(v-if="showSymbols" placeholder="Old password" label="Old password" v-model="passwordOld")
        IInput.changePassword__input(v-else placeholder="Old password" label="Old password" v-model="passwordOld" type="password")
        IInput.changePassword__input(v-if="showSymbols" placeholder="New password" label="New password" v-model="passwordNew")
        IInput.changePassword__input(v-else placeholder="New password" label="New password" v-model="passwordNew" type="password")
        IInput.changePassword__input(v-if="showSymbols" placeholder="Repeat password" label="Repeat password" v-model="passwordRepeat")
        IInput.changePassword__input(v-else placeholder="Repeat password" label="Repeat password" v-model="passwordRepeat" type="password")
      .changePassword__block
        Checkbox.changePassword__checkbox(v-model="showSymbols")
          .changePassword__text Display symbols
    BButton.changePassword__button(color="malachite" rounded @click.native="signIn") Save
</template>

<script>
import Checkbox from 'components/Checkbox';
import IInput from 'components/IInput';
import BButton from 'components/BButton';
import Page from './Page';

export default {
  data() {
    return {
      passwordOld: '',
      passwordNew: '',
      passwordRepeat: '',
      showSymbols: false,
    };
  },
  components: {
    Page,
    Checkbox,
    IInput,
    BButton,
  },
};
</script>


<style lang="scss">
@import "~sass/bootstrap/media";

.changePassword {
  &__main {
    display: flex;
    margin-top: 43px;
  }
  &__block {
    width: 211px;
    &:not(:last-of-type) {
      margin-right: 58px;
    }
  }
  &__input {
    font-size: 14px;
    margin-bottom: 35px;
  }
  &__checkbox {
    padding-top: 10px;
  }
  &__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    margin-left: 20px;
  }
  &__button {
    padding: 8px 44px;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
  }
}

@include media-breakpoint-down(md) {
  .changePassword {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__main {
      flex-direction: column;
      align-items: center;
      margin-top: 0;
      margin-bottom: 43px;
    }
    &__block {
      &:not(:last-of-type) {
        margin: 0;
      }
    }
  }
}
</style>
