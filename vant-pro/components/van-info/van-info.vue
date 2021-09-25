<template>
	<view v-if="(info !== null && info !== '') || dot" class="van-info" :class="[customClass, $u.bem('info', { dot })]" :style="customStyle">{{ dot ? '' : info }}</view>
</template>

<script>
export default {
	props: {
		dot: {
			type:Boolean
		},
		info: {
			type: null
		},
		customStyle: {
			type: Object,
			default: ()=>{}
		},
		customClass: {
			type: String
		}
	}
};
</script>

<style scoped lang="scss">
.van-info {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  white-space: nowrap;
  transform: translate(50%, -50%);
  transform-origin: 100%;
  height: $info-size;
  min-width: $info-size;
  padding: $info-padding;
  color: $info-color;
  font-weight: $info-font-weight;
  font-size: $info-font-size;
  background-color: $info-background-color;
  border: $info-border-width solid $white;
  border-radius: $info-size
}

.van-info--dot {
  min-width: 0;
  border-radius: 100%;
  width: $info-dot-size;
  height: $info-dot-size;
  background-color: $info-dot-color
}
</style>
