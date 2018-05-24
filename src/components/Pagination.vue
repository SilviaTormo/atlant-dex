<template lang="pug">
  .pagination(v-show="pageCount > 1")
        .pagination__container
          Icon.pagination__arrow.pagination__arrow-first(
            id="icon-pagination-global",
            :class="{'pagination__arrow-active' : page > 1}",
            @click="page > 1 ? pageAction(1) : ''"
          )
          Icon.pagination__arrow.pagination__arrow-before(
            id="icon-pagination",
            :class="{'pagination__arrow-active' : page > 1}",
            @click="page > 1 ? pageAction(page - 1) : ''"
          )
          .pagination__number(v-show="page > 3" , @click="pageAction(1)") 1
          .pagination__space(v-show="page > 4") ...
          .pagination__number(v-show="(page - 2) > 0", @click="pageAction(page - 2)") {{page - 2}}
          .pagination__number(v-show="(page - 1) > 0", @click="pageAction(page - 1)") {{page - 1}}
          .pagination__number.pagination__number-active Page {{page}}
          .pagination__number(v-show="(page + 1) < pageCount", @click="pageAction(page+1)") {{page + 1}}
          .pagination__number(v-show="(page + 2) < pageCount", @click="pageAction(page + 2)") {{page + 2}}
          .pagination__space(v-show="(page + 3) < pageCount") ...
          .pagination__number(v-show="page < pageCount", @click="pageAction(pageCount)") {{pageCount}}
          Icon.pagination__arrow.pagination__arrow-next(
            id="icon-pagination",
            :class="{'pagination__arrow-active' : page < pageCount}",
            @click="page < pageCount ? pageAction(page + 1) : ''"
          )
          Icon.pagination__arrow.pagination__arrow-last(
            id="icon-pagination-global",
            :class="{'pagination__arrow-active' : page < pageCount}",
            @click="page < pageCount ? pageAction(pageCount) : '' "
          )
</template>

<script>

export default {
  props: {
    page: {
      type: Number,
    },
    pageCount: {
      type: Number,
    },
    pageAction: {
      type: Function,
    },
  },
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  margin: 46px 0;

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__number {
    color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    margin: 0 8px;
    white-space: nowrap;
    cursor: pointer;
    &-active {
      color: #ffc600;
      font-weight: 700;
      cursor: default;
    }
  }

  &__arrow {
    height: 8px;
    fill: #ffffff;
    opacity: 0.5;
    margin: 0 18.5px;
    &-active {
      opacity: 1;
      cursor: pointer;
    }
    &-first {
      transform: rotate(180deg);
    }
    &-before {
      transform: rotate(180deg);
    }
  }

  &__space {
    margin: 0 3px;
    cursor: default;
  }
}
</style>
