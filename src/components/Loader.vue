<template lang="pug">
  .loader(v-show="loading")
    .loader__hour
    .loader__minute
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.loader {
  display: block;
  margin: auto;
  position: relative;
  width: 4rem;
  height: 4rem;
  border: 0.4rem solid #2085e6;
  border-radius: 100%;
  &__hour,
  &__minute {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -0.2rem 0 0 -0.2rem;
    border-bottom: 0.4rem solid #2085e6;
    border-radius: 0.6rem;
    transform-origin: 0.2rem center;
  }
  &__hour {
    width: 30%;
    animation: rotate 10s linear infinite;
  }
  &__minute {
    width: 40%;
    background-color: #2085e6;
    animation: rotate 1s linear infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
