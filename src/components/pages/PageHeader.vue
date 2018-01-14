<template lang="pug">
.pageHeader
  BackToDashboard
  .pageHeader__title(v-if="!isMobile") {{title}} :
  .pageHeader__shadow
</template>

<script>
import {mapGetters} from 'vuex';
import BackToDashboard from './BackToDashboard';

export default {
  computed: {
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
  },
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  components: {
    BackToDashboard,
  },
};
</script>

<style lang="scss">
@import '~variables';
@import "~sass/bootstrap/media";

.pageHeader {
  display: flex;
  align-items: center;
  padding: 36px;
  border-top: 1px solid $color_tangaroa;
  &__title {
    font-weight: 700;
    text-transform: uppercase;
    margin-left: 52px;
  }
}

@include media-breakpoint-down(md) {
  .pageHeader {
    position: fixed;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 52px;
    top: calc(100% - 52px);
    left: 0;
    right: 0;
    padding: 0;
    padding-left: 30px;
    background: repeating-linear-gradient(
      135deg,
      #103c55,
      #103c55 25px,
      #03324c 0,
      #03324c 60px
    );
    z-index: 1.5;
    &__shadow {
      background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #01293f 100%);
      height: 52px;
      width: 100%;
      position: absolute;
      top: -50px;
    }
  }
}
</style>
