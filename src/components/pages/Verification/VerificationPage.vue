<template lang="pug">
Page(
  title="Verification",
  title2="Please upload the following files in order to verify your account:",
  :sidebar="true"
)
  .verification
    .verification__title PERSONAL INFORMATION:
    VerificationForm
    .verification__title Please upload the following files in order to verify your account:
    VerificationUpload
</template>

<script>
import {mapState, mapActions} from 'vuex';
import BButton from 'components/BButton';
import Page from '../Page';
import VerificationForm from './VerificationForm';
import VerificationUpload from './VerificationUpload';

export default {
  name: 'VerificationPage',
  computed: {
    ...mapState('verify', {
      verification: 'lastVerification',
    }),
  },
  methods: {
    ...mapActions('verify', {
      verifyTierOne: 'verifyTierOne',
      getLastVerification: 'getLastVerification',
    }),
    upload() {
      let formData = new FormData(document.forms.tierOne);
      this.verifyTierOne(formData);
    },
  },
  mounted() {
    this.getLastVerification();
    // const uppy = Uppy({autoProceed: false})
    //   .use(Dashboard, {
    //     target: '.verification__form',
    //     inline: true,
    //     locale: {
    //       strings: {
    //         dropPaste: 'Drag your files here to upload',
    //       },
    //     },
    //   })
    //   .use(Tus, {endpoint: '//master.tus.io/files/'})
    //   .run();
    //
    // uppy.on('complete', (result) => {
    //   console.log(`Upload complete! We’ve uploaded these files: ${result.successful}`);
    // });
  },
  components: {
    Page,
    BButton,
    VerificationForm,
    VerificationUpload,
  },
};
</script>


<style lang="scss" scoped>
@import "~sass/bootstrap/media";
@import "~sass/variables";
.verification {
  color: $color_white;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  max-width: 560px;

  &__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    margin-bottom: 40px;
    text-transform: uppercase;
  }
  /////////////////////////
  ////////////////////////
  ////////////////////////
  /*&__main {*/
    /*font-size: 14px;*/
    /*font-weight: 400;*/
    /*line-height: 19px;*/
    /*& > * {*/
      /*margin-bottom: 19px;*/
    /*}*/
  /*}*/
  /*&__list {*/
    /*counter-reset: item;*/
  /*}*/
  /*&__listHeader {*/
    /*color: #31ecce;*/
    /*font-weight: 700;*/
    /*margin: 19px 0;*/
    /*list-style: none;*/
    /*&::before {*/
      /*<!--margin-left: -24px;-->*/
      /*margin-right: 10px;*/
      /*counter-increment: item;*/
      /*content: counter(item) ".";*/
      /*color: #ffffff;*/
      /*font-size: 16px;*/
      /*font-weight: 700;*/
      /*line-height: 25px;*/
      /*text-transform: uppercase;*/
    /*}*/
  /*}*/
  /*&__entityType {*/
    /*font-weight: 700;*/
  /*}*/
  /*&__note {*/
    /*font-size: 12px;*/
    /*font-weight: 700;*/
    /*margin-bottom: 53px;*/
  /*}*/
  /*&__form {*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*& > * {*/
      /*margin-bottom: 10px;*/
    /*}*/
    // min-height: 142px;
    // border-radius: 4px;
    // border: 1px dashed #ffffff;
    // opacity: 0.5;
    // display: flex;
  /*}*/
  // &__formText {
  //   opacity: 0.5;
  //   font-size: 20px;
  //   font-weight: 300;
  //   margin: auto;
  // }
  /*&__label {*/
    /*& * {*/
      /*margin-left: 10px;*/
    /*}*/
  /*}*/
}
@include media-breakpoint-down(md) {
  .verification {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__main {
      & * {
        width: 100%;
      }
      max-width: 560px;
    }
  }
}
</style>
