<template lang="pug">
Modal
  .welcome
    Icon.welcome__icon(id="wallet2")
    .welcome__greeting Welcome,#[br] first of all you must create or#[br] import you wallet
    .welcome__buttons
      BButton.welcome__button(color="malachite" rounded) Create new
      b.welcome__or or
      BButton.welcome__button(color="yellow" rounded outline @click="openImport()") Import
</template>

<script>
import {mapMutations} from 'vuex';
import Icon from 'components/Icon';
import BButton from 'components/BButton';
import Modal from 'components/modals/Modal';

export default {
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
    Modal,
    BButton,
  },
};
</script>

<style lang="scss">
@import "~variables";
@import "~sass/bootstrap/media";

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
  }
  &__greeting {
    font-size: 30px;
    margin-top: 64px;
    text-align: center;
  }
  &__buttons {
    margin-top: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
  }
  &__button {
    height: 35px;
    font-size: inherit;
    width: 111px;
  }
}

@include media-breakpoint-down(md) {
  .welcome {
    &__or {
      display: none;
    }
    &__buttons {
      flex-direction: column;
    }
    &__button {
      width: 100%;
      &:first-of-type {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
