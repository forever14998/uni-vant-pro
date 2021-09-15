import { canIUseGetUserProfile } from '../common/version';
export const button = Behavior({
  externalClasses: ['hover-class'],
  props: {
    id: String,
    lang: String,
    businessId: Number,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    ariaLabel: String,
    openType: String,
    getUserProfileDesc: String,
  },
  data() {
	  return {
		  canIUseGetUserProfile: canIUseGetUserProfile(),
	  }
  },
  methods: {
    onGetUserInfo(event) {
      this.$emit('getuserinfo', event.detail);
    },
    onContact(event) {
      this.$emit('contact', event.detail);
    },
    onGetPhoneNumber(event) {
      this.$emit('getphonenumber', event.detail);
    },
    onError(event) {
      this.$emit('error', event.detail);
    },
    onLaunchApp(event) {
      this.$emit('launchapp', event.detail);
    },
    onOpenSetting(event) {
      this.$emit('opensetting', event.detail);
    },
  },
});
