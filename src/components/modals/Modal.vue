<template lang="pug">
.modal(v-if="isOpened(name)")
  .modal__overlay(@click="closeModal()")
  .modal__main
    .modal__header
      Icon.modal__logo(id="logo")
    .modal__body(:class="[`modal__body--${screenType}`, `modal__body--${name}`]")
      .modal__content
        slot
      Icon.modal__cross(id="cross" @click="closeModal()")
    .modal__footer Copyright © Atlant, 2018
</template>

<script>
import Icon from 'components/Icon';
import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapGetters('modal', {
      isOpened: 'isOpened',
    }),
    ...mapState('misc', {
      screenType: 'screenType',
    }),
  },
  methods: {
    ...mapMutations('modal', {
      close: 'close',
    }),
    closeModal() {
      this.close();
      this.onClose();
    },
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    onClose: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
@import "~variables";
@import '~sass/bootstrap/media';
$padding: 44px;

.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 888;
  &__main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    padding: 64px 0;
  }
  &__overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 800;
    background-color: rgba(0,0,0,0.40);
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 801;
  }
  &__body {
    margin: 0 auto;
    padding: $padding;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 600px;
    width: 600px;
    border-radius: 12px;
    z-index: 801;
    box-shadow: 0 25px 20px rgba(0, 0, 0, 0.24);
    background-image: repeating-linear-gradient(
      135deg,
      #002338,
      #002338 45px,
      #0d2e41 0,
      #0d2e41 80px
    )
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  &__footer {
    font-size: 10px;
    text-align: center;
    z-index: 801;
  }
  &__logo {
    width: 192px;
    height: 28px;
    fill: #fff;
  }
  &__cross {
    display: none;
  }
}

@include media-breakpoint-down(md) {
  .modal {
    height: 100%;
    &__body {
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      padding-top: 60px;
      padding-bottom: 30px;
      padding-left: $padding / 2;
      padding-right: $padding / 2;
      box-shadow: 0;
      position: static;
      transform: none;
    }
    &__cross {
      $size: 24px;
      width: $size;
      height: $size;
      fill: #fff;
      display: block;
      cursor: pointer;
      margin-left: auto;
      margin-right: auto;
    }
    &__overlay {
      display: none;
    }
  }
}
</style>
