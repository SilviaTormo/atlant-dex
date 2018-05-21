<template lang="pug">
ModalLayout
  Status(:isSuccess="true")
</template>

<script>
import ModalLayout from '@/layout/ModalLayout';
import Status from '@/components/Status.vue';

export default {
  components: {
    ModalLayout,
    Status,
  },
};
</script>

<style lang="scss">
</style>
