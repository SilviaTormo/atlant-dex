<template lang="pug">
Modal2(name="signIn")
  .reset
    Icon.reset__icon(id="signin")
    .reset__header
      .reset__title Sign in
      .reset__other Sign up
    .reset__inputs
      IInput.reset__input(label="Email", v-model="email")
      IInput.reset__input(label="Password", v-model="password")
    .reset__rememberContainer
      Radio.reset__remember(name="remember", :value="t", label="Remember me", v-model="remember")
    BButton.reset__button(color="malachite" rounded) Let me in
    a.reset__forgot(href="#") Forgot password?
</template>

<script>
import {mapMutations} from 'vuex';
import Icon from 'components/Icon';
import Radio from 'components/Radio';
import BButton from 'components/BButton';
import Modal2 from 'components/modals/Modal2';
import IInput from 'components/IInput';

export default {
  data() {
    return {
      email: '',
      password: '',
      remember: false,
    };
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    openImport() {
      this.openModal('importKey');
    },
  },
  components: {
    Icon,
    Radio,
    Modal2,
    BButton,
    IInput,
  },
};
</script>

<style lang="scss">
@import "~variables";
@import "~sass/bootstrap/media";

.reset {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 66px;
    margin-bottom: 70px;
  }
  &__title {
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
  }
  &__other {
    $color: #f7b933;
    color: $color;
    font-size: 14px;
    position: relative;
    font-weight: 700;
    cursor: pointer;
    &::after {
      content: "";
      height: 3px;
      width: 100%;
      bottom: -5px;
      left: 0;
      position: absolute;
      background-color: $color;
    }
  }
  &__inputs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    & > * {
      flex-basis: 40%;
      margin-bottom: 50px;
    }
  }
  &__button {
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
    font-weight: 900px;
    text-transform: uppercase;
  }
  &__rememberContainer {
    margin-bottom: 50px;
  }
  &__forgot {
    color: #f7b933;
    margin-top: 40px;
    text-decoration: none;
  }
}

@include media-breakpoint-down(md) {
}
</style>
