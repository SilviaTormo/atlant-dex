<template lang="pug">
ModalLayout
  Status(:isSuccess="true")
</template>

<script>
import ModalLayout from '@/layouts/ModalLayout';
import Status from 'components/Status.vue';

export default {
  components: {
    ModalLayout,
    Status,
  },
};
</script>

<style lang="scss">
</style>
