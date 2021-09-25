export const link = Behavior({
  properties: {
    url: String,
    linkType: {
      type: String,
      value: 'navigateTo',
    },
  },
  methods: {
    jumpLink(urlKey = 'url') {
      const url = this[urlKey];
      if (url) {
        if (
          this.linkType === 'navigateTo' &&
          getCurrentPages().length > 9
        ) {
          uni.redirectTo({ url });
        } else {
          uni[this.linkType]({ url });
        }
      }
    },
  },
});
