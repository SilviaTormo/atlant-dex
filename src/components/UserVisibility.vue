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
    elm() {
      return this.$slots.default[0].elm;
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
  },
  mounted() {
    if (this.onLoginClick) {
      this.elm.addEventListener('click', this.onClick);
    }
  },
  beforeDestroy() {
    this.elm && this.elm.removeEventListener('click', this.onClick);
  },
  props: {
    hideOnLogout: Boolean,
    hideOnLogin: Boolean,
    onLoginClick: Function,
  },
};
</script>
