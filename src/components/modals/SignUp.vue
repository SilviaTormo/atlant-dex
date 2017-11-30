<template lang="pug">
Modal2(name="signUp")
  .reset
    Icon.reset__icon(id="signup")
    .reset__header
      .reset__title Sign up
      .reset__other Sign in
    .reset__inputs
      IInput.reset__input(label="Email address", textVariable="emailReset")
      IInput.reset__input(label="Confirm password", textVariable="password")
      IInput.reset__input(label="Choose a password", textVariable="passwordRepeat")
      Radio(:name="acknowledged", value="acknowledged", label="I agree to the User Agreement and Privacy Policy.", v-model="type")
    BButton.reset__button(color="malachite" rounded) Create account
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
      acknowledged: false,
      type: '',
    };
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
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
  &__input {
    width: 45%;
  }
  &__button {
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
    font-weight: 900px;
    text-transform: uppercase;
  }
}

@include media-breakpoint-down(md) {
}
</style>
