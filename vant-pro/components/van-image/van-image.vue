<template>
	<view :style="[rootStyle({ width, height, radius })]" class="custom-class" :class="[$u.bem('image', { round })]" @tap="infoClick">
		<image
			v-if="!error"
			:src="src"
			:mode="mode(fit)"
			:lazy-load="lazyLoad"
			class="image-class van-image__img"
			:show-menu-by-longpress="showMenuByLongpress"
			@load="loadClick"
			@error="errorClick"
		/>

		<view v-if="loading && showLoading" class="loading-class van-image__loading">
			<slot v-if="useLoadingSlot" name="loading" />
			<van-icon v-else name="photo" custom-class="van-image__loading-icon" />
		</view>
		<view v-if="error && showError" class="error-class van-image__error">
			<slot v-if="useErrorSlot" name="error" />
			<van-icon v-else name="photo-fail" custom-class="van-image__error-icon" />
		</view>
	</view>
</template>

<script>
/**
 * @property {String} src 图片路径
 * @property {Boolean} round 是否显示为圆形
 * @property {String| Number } width 宽度 单位rpx
 * @property {String| Number } height 高度 单位rpx
 * @property {String| Number } radius 圆角大小 单位rpx
 * @property {Boolean} lazyLoad 是否懒加载
 * @property {Boolean} useErrorSlot 是否自定义失败提示
 * @property {Boolean} useLoadingSlot 是否自定义加载中提示
 * @property {Boolean} showMenuByLongpress 是否开启长按图片显示识别小程序码菜单
 * @property {String} fit 图片填充模式 contain|cover|fill|none|scale-down
 * @property {Boolean} showError 是否展示图片加载失败的提示
 * @property {Boolean} showLoading 是否展示图片加载中的提示
 * @event {Function} click 点击图标时触发
 */
import { button } from '../../libs/minixs/button.js';

const FIT_MODE_MAP = {
	none: 'center',
	fill: 'scaleToFill',
	cover: 'aspectFill',
	contain: 'aspectFit',
	widthFix: 'widthFix',
	heightFix: 'heightFix'
};
export default {
	mixins: [button],
	props: {
		// 图片路径
		src: {
			type: String,
			default: ''
		},
		// 是否显示为圆形
		round: {
			type: Boolean
		},
		// 宽度 单位rpx
		width: String | Number,
		// 高度 单位rpx
		height: String | Number,
		// 圆角大小 单位rpx
		radius: String | Number,
		// 是否懒加载
		lazyLoad: Boolean,
		// 是否自定义失败提示
		useErrorSlot: Boolean,
		// 是否自定义加载中提示
		useLoadingSlot: Boolean,
		showMenuByLongpress: Boolean,
		// 图片填充模式 contain|cover|fill|none|scale-down
		fit: {
			type: String,
			default: 'fill'
		},
		// 是否展示图片加载失败的提示
		showError: {
			type: Boolean,
			default: true
		},
		// 是否展示图片加载中的提示
		showLoading: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		src() {
			this.error = false;
			this.loading = true;
		}
	},
	data() {
		return {
			error: false,
			loading: true,
			viewStyle: ''
		};
	},
	methods: {
		loadClick(event) {
			this.loading = false;
			this.$emit('load', event.detail);
		},
		errorClick(event) {
			this.loading = false;
			this.error = true;
			this.$emit('error', event.detail);
		},
		infoClick(event) {
			this.$emit('click', event.detail);
		},
		rootStyle(data) {
			return this.$u.style({
				width: this.$u.addUnit(data.width),
				height: this.$u.addUnit(data.height),
				'border-radius': this.$u.addUnit(data.radius),
				overflow: data.radius ? 'hidden' : null
			});
		},

		mode(fit) {
			return FIT_MODE_MAP[fit];
		}
	}
};
</script>

<style scoped lang="scss">
.van-image {
	position: relative;
	display: inline-block;
}

.van-image--round {
	overflow: hidden;
	border-radius: 50%;
}

.van-image--round .van-image__img {
	border-radius: inherit;
}

.van-image__error,
.van-image__img,
.van-image__loading {
	display: block;
	width: 100%;
	height: 100%;
}

.van-image__error,
.van-image__loading {
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: $image-placeholder-text-color;
	font-size: $image-placeholder-font-size;
	background-color: $image-placeholder-background-color;
}

.van-image__loading-icon {
	color: $image-loading-icon-color;
	font-size: $image-loading-icon-size !important;
}

.van-image__error-icon {
	color: $image-error-icon-color;
	font-size: $image-error-icon-size !important;
}
</style>
