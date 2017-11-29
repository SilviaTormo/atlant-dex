<template lang="pug">
.modal2(v-if="isOpened(name)", :class="[`modal2--${screenType}`, `modal2--${name}`]")
  .modal2__header
    Icon.modal2__logo(id="logo")
  .modal2__content
    slot
  //- Icon.modal2__cross(id="cross" @click="closeModal()")
  .modal2__credits Copyright © Atlant, 2017
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

<style lang="scss">
@import "~variables";
@import '~sass/bootstrap/media';
$padding: 44px;

.modal2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 100px 0;
  background-color: #000304;
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 64px 52px;
    background-image: repeating-linear-gradient(
      135deg,
      transparent,
      transparent 40px,
      rgba(255,255,255,0.05) 0,
      rgba(255,255,255,0.05) 80px
    )
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__credits {
    font-size: 8px;
    text-align: center;
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
  .modal2 {
    height: 100%;
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
  }
}
</style>
