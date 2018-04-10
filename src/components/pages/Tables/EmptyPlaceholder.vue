<template lang="pug">
.empty
  Icon.empty__icon(id="magnifier")
  .empty__text We couldn’t find any {{content}}
</template>

<script>
import Icon from '../../Icon';

export default {
  props: {
    content: {
      type: String,
      required: false,
    },
  },
  components: {
    Icon,
  },
};
</script>


<style lang="scss" scoped>
@import '~sass/bootstrap/media';
.empty {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__icon {
    $size: 128px;
    width: $size;
    height: $size;
    margin: 53px 0;
  }
  &__text {
    opacity: 0.5;
    font-size: 30px;
    font-weight: 300;
    line-height: 45px;
    text-align: center;
  }
}
</style>
