<script>
import {mapGetters} from 'vuex';

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
  props: {
    hideOnLogout: Boolean,
    hideOnLogin: Boolean,
  },
};
</script>
