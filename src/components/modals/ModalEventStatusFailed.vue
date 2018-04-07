<template lang="pug">
Modal
  Status(:isSuccess="false")
</template>

<script>
import Modal from 'components/modals/Modal';
import Status from 'components/modals/Status.vue';

export default {
  components: {
    Modal,
    Status,
  },
};
</script>

<style lang="scss">
</style>
