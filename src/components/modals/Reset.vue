<template lang="pug">
Modal2(name="reset")
  .reset
    Icon.reset__icon(id="pass")
    .reset__header
      .reset__title Reset password
      .reset__other Sign in
    .reset__inputs
      input.reset__input
      input.reset__input
      input.reset__input
      Radio(:name="acknowledged", value="acknowledged", label="I acknowledge that my account will be locked for a minimum of 24 hours.", v-model="type")
    BButton.reset__button(color="malachite" rounded) Reset now
</template>

<script>
import {mapMutations} from 'vuex';
import Icon from 'components/Icon';
import Radio from 'components/Radio';
import BButton from 'components/BButton';
import Modal2 from 'components/modals/Modal2';

export default {
  data() {
    return {
      acknowledged: false,
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
}

@include media-breakpoint-down(md) {
}
</style>
