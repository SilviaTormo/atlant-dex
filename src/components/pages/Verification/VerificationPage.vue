<template lang="pug">
Page(
  title="Verification",
  title2="Please upload the following files in order to verify your account:",
  :sidebar="true"
)
  .verification
    .verification__title PERSONAL INFORMATION:
    .verification__form
      VerificationForm
    .verification__title Please upload the following files in order to verify your account:
    .verification__upload
      VerificationFiles
    .verification__button
      BButton(color="malachite" rounded caps) Verify Me
</template>

<script>
import {mapState, mapActions} from 'vuex';
import BButton from 'components/BButton';
import Page from '../Page';
import VerificationForm from './VerificationForm';
import VerificationFiles from './VerificationFiles';

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
    VerificationFiles,
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
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  &__form {
    padding: 15px 0 30px;
  }
  &__button {
    margin-top: 50px;
  }
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
