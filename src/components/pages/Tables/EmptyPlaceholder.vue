<template lang="pug">
.empty
  Icon.empty__icon(id="magnifier")
  .empty__text We couldn’t find any {{content}}
</template>

<script>

export default {
  props: {
    content: {
      type: String,
      required: false,
    },
  },
};
</script>


<style lang="scss" scoped>
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
