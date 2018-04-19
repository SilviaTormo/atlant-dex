<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'UserVisibility',
  render() {
    if (this.isHide) return null;
    return this.$slots.default[0];
  },
  computed: {
    ...mapGetters('membership', [
        'isLoggedIn',
    ]),
    isHide() {
      return (this.hideOnLogout && !this.isLoggedIn)
      || (this.hideOnLogin && this.isLoggedIn);
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    onClick() {
      if (this.isLoggedIn) {
        this.onLoginClick();
      } else {
        this.openModal({name: 'signIn'});
      }
    },
    setClickEventListener() {
      this.$nextTick(() => {
        const {elm} = this.$slots.default[0];
        if (this.onLoginClick && elm) {
          elm.addEventListener('click', this.onClick);
        }
      });
    },
  },
  watch: {
    isLoggedIn(isLoggedIn) {
      if (isLoggedIn) {
        this.setClickEventListener();
      }
    },
  },
  mounted() {
    this.setClickEventListener();
  },
  beforeDestroy() {
    const {elm} = this.$slots.default[0];
    elm && elm.removeEventListener('click', this.onClick);
  },
  props: {
    hideOnLogout: Boolean,
    hideOnLogin: Boolean,
    onLoginClick: Function,
  },
};
</script>
