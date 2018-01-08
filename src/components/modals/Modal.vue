<template lang="pug">
.modal
  .modal__overlay(@click="closeModal()")
  .modal__main
    .modal__body(:class="[`modal__body--${screenType}`]")
      Icon.modal__closeIcon(id="close"  @click="closeModal()")
      .modal__content
        slot
      Icon.modal__cross(id="cross" @click="closeModal()")
</template>

<script>
import Icon from 'components/Icon';
import {mapState, mapMutations} from 'vuex';

export default {
  computed: {
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
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 888;
  &__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100%;
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
  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-width: 407px;
    min-height: 600px;
    margin: 0 auto;
    padding: $padding;
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
  &__closeIcon {
    z-index: 801;
    top: -30px;
    right: -30px;
    width: 32px;
    height: 32px;
    position: absolute;
    cursor: pointer;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  &__cross {
    display: none;
  }
}

@include media-breakpoint-down(md) {
  .modal {
    height: 100%;
    &__main {
      padding: 0;
    }
    &__body {
      min-height: 100vh;
      min-width: 100%;
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

    &__closeIcon {
      z-index: 801;
      top: 19px;
      right: 24px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
