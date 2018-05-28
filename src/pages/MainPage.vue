<template lang="pug">
  .mainPage
    Grid.mainPage__dashboard
    .mainPage__another(:class="{'mainPage__another--withSidebar': showSidebar}") Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</template>

<script>
import {mapState} from 'vuex';
import Grid from 'components/grid/Grid';

export default {
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
  },
  components: {
    Grid,
  },
};
</script>

<style lang="scss">
.mainPage {
  display: flex;
  height: 100%;
  &__dashboard {
    background: #000;
    flex: 1;
    z-index: 1;
  }
  &__another {
    flex: 1;
    background: red;
    &--withSidebar {
      margin-left: -370px;
    }
  }
}
</style>
