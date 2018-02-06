<template lang="pug">
.modal(@click="closeModal()")
  .modal__main
    .modal__body(:class="[`modal__body--${screenType}`]")
      Icon.modal__closeIcon(id="close"  @click="closeModal()")
      .modal__content
        slot
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
$padding: 40px;

.modal {
  position: fixed;
  overflow: auto;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 888;
  background-color: rgba(0,0,0,0.40);
  &__main {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 407px;
    // min-height: 600px;
    padding: $padding;
    margin: auto;
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
    transition: transform .5s;
    &:hover {
      transition: transform .5s;
      transform: scale(1.1);
    }
  }
  &__cross {
    display: none;
  }
}

@include media-breakpoint-down(md) {
  .modal {
    min-height: 100%;
    &__main {
      padding: 0;
    }
    &__body {
      width: 100%;
      min-height: 100%;
      min-width: 100%;
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
