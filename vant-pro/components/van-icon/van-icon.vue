<template>
	<view :class="[rootClass({ classPrefix, name })]" :style="[rootStyle({ customStyle, color, size })]" @tap="onClick">
		<van-info v-if="info || dot" :dot="dot" :info="info" custom-class="van-icon__info" />
		<image v-if="isImage(name)" :src="name" mode="aspectFit" class="van-icon__image" />
	</view>
</template>

<script>
/**
 * @property {Boolean} dot 是否显示小红点
 * @property info 徽标内容
 * @property {String| Number } size 图标大小
 * @property {String} color 图标颜色
 * @property {String} classPrefix 图标前缀
 * @property {String} name 图标名字
 */
export default {
	props: {
		// 是否显示小红点
		dot: {
			type: Boolean,
			default: false
		},
		// 徽标内容
		info: {
			type: null,
			default:null
		},
		// 图标大小
		size: {
			type: String || Number,
			default: '38'
		},
		// 图标颜色
		color: {
			type: String,
			default: '#646566'
		},
		// 自定义样式
		customStyle: {
			type: Object
		},
		// 图标前缀
		classPrefix: {
			type: String,
			default: 'van-icon'
		},
		// 图标名字
		name: {
			type: String
		}
	},
	data() {
		return {};
	},
	methods: {
		/**
		 * 点击事件
		 */
		onClick() {
			this.$emit('click');
		},
		/**
		 * @param {Object} name
		 * 是否是图片
		 */
		isImage(name) {
			return name && name.indexOf('/') !== -1;
		},
		rootClass(data) {
			var classes = ['custom-class'];
			if (data.classPrefix != null) {
				classes.push(data.classPrefix);
			}

			if (this.isImage(data.name)) {
				classes.push('van-icon--image');
			} else if (data.classPrefix != null) {
				classes.push(data.classPrefix + '-' + data.name);
			}

			return classes.join(' ');
		},
		rootStyle(data) {
			return this.$u.style(
				{
					color: data.color,
					'font-size': this.$u.addUnit(data.size),
					...data.customStyle
				}
			);
		}
	}
};
</script>

<style scoped>
@import '../../libs/css/icon.css';
:host {
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.van-icon--image {
	width: 1em;
	height: 1em;
}

.van-icon__image {
	width: 100%;
	height: 100%;
}

.van-icon__info {
	z-index: 1;
}

.van-icon {
	position: relative;
	font: normal normal normal 14px/1 vant-icon;
	font-size: inherit;
	text-rendering: auto;
	-webkit-font-smoothing: antialiased;
}

.van-icon,
.van-icon:before {
	display: inline-block;
}
</style>
