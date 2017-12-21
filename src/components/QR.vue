<template lang="pug">
canvas#qr
</template>

<script>
  import qrious from 'qrious';

  export default {
    methods: {
      createQR() {
        let qr = new qrious({
          element: document.querySelector('#qr'),
          value: this.text,
          size: this.size,
          backgroundAlpha: 0,
          foreground: '#fff',
        });
        console.log('qr is', qr);
      },
    },
    watch: {
      text() {
        this.createQR();
      },
    },
    mounted() {
      this.createQR();
    },
    props: {
      text: {
        type: [String, Number],
        required: true,
        default: '',
      },
      size: {
        type: [Number, String],
        required: false,
        default: 128,
      },
    },
  };
</script>
