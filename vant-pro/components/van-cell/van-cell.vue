<template>
	<view
		class="custom-class van-cell"
		:class="[this.$u.bem('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable }])]"
		hover-class="van-cell--hover hover-class"
		hover-stay-time="70"
		:style="customStyle"
		bind:tap="onClick"
	>
		<van-icon v-if="icon" :name="icon" class="van-cell__left-icon-wrap" custom-class="van-cell__left-icon" />
		<slot v-else name="icon" />

		<view :style="[headlineStyle()]" class="van-cell__title title-class">
			<block v-if="title">{{ title }}</block>
			<slot v-else name="title" />

			<view v-if="label || useLabelSlot" class="van-cell__label label-class">
				<slot v-if="useLabelSlot" name="label" />
				<block v-else-if="label">{{ label }}</block>
			</view>
		</view>

		<view class="van-cell__value value-class">
			<block v-if="value || value === 0">{{ value }}</block>
			<slot v-else />
		</view>

		<van-icon
			v-if="isLink"
			:name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'"
			class="van-cell__right-icon-wrap right-icon-class"
			custom-class="van-cell__right-icon"
		/>
		<slot v-else name="right-icon" />

		<slot name="extra" />
	</view>
</template>

<script>
import * as link from '../../libs/minixs/link.js';
/**
 * @property {String | Number} title 左侧标题	
 * @property {String | Number} value 右侧内容	
 * @property {String} icon 左侧图标名称或图片链接，可选值见 Icon 组件	
 * @property {String} size 单元格大小，可选值为 large
 * @property {String} label 标题下方的描述信息
 * @property {Boolean} center 是否使内容垂直居中
 * @property {Boolean} is-link 是否展示右侧箭头并开启点击反馈
 * @property {Boolean} required 是否显示表单必填星号
 * @property {Boolean} clickable 是否开启点击反馈	
 * @property {String | Number} title-width 默认选中的日期
 * @property {String} custom-style 自定义样式
 * @property {String} arrow-direction 箭头方向，可选值为 right|left|up|down
 * @property {Boolean} use-label-slot 是否使用 label slot
 * @property {Boolean} border 是否显示下边框
 * @property {Object} title-style 标题样式
 * @property {String} url 点击后跳转的链接地址	
 * @property {String} link-type 链接跳转类型，可选值为 navigateTo | redirectTo | switchTab | reLaunch	
 */
export default {
	mixins: [link],
	props: {
		title: String | Number,
		value: String | Number,
		icon: String,
		size: String,
		label: String,
		center: Boolean,
		isLink: Boolean,
		required: Boolean,
		clickable: Boolean,
		titleWidth: String|Number,
		customStyle: String,
		arrowDirection: String,
		useLabelSlot: Boolean,
		border: {
			type: Boolean,
			default: true
		},
		titleStyle: Object
	},
	computed:{
	},
	methods: {
		onClick(event) {
			this.$emit('click', event.detail);
			this.jumpLink();
		},
		headlineStyle() {
			return this.$u.style({
				'max-width': this.$u.addUnit(this.titleWidth),
				'min-width': this.$u.addUnit(this.titleWidth),
				...this.titleStyle
			});
		}
	}
};
</script>

<style scoped lang="scss">
.van-cell {
	position: relative;
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: $cell-vertical-padding $cell-horizontal-padding;
	font-size: $cell-font-size;
	line-height: $cell-line-height;
	color: $cell-text-color;
	background-color: $cell-background-color;
}

.van-cell::after {
	position: absolute;
	box-sizing: border-box;
	transform-origin: center;
	content: ' ';
	pointer-events: none;
	right: 32rpx;
	bottom: 0;
	left: 32rpx;
	border-bottom: 1rpx solid #ebedf0;
	transform: scaleY(0.5);
}

.van-cell--borderless:after {
	display: none;
}

.van-cell-group {
	background-color: $cell-background-color;
}

.van-cell__label {
	margin-top: $cell-label-margin-top;
	font-size: $cell-label-font-size;
	line-height: $cell-label-line-height;
	color: $cell-label-color;
}

.van-cell__value {
	overflow: hidden;
	text-align: right;
	vertical-align: middle;
	color: $cell-value-color;
}

.van-cell__title,
.van-cell__value {
	flex: 1;
}

.van-cell__title:empty,
.van-cell__value:empty {
	display: none;
}

.van-cell__left-icon-wrap,
.van-cell__right-icon-wrap {
	display: flex;
	align-items: center;
	height: $cell-line-height;
	font-size: $cell-icon-size;
}

.van-cell__left-icon-wrap {
	margin-right: $padding-base;
}

.van-cell__right-icon-wrap {
	margin-left: $padding-base;
	color: $cell-right-icon-color;
}

.van-cell__left-icon {
	vertical-align: middle;
}

.van-cell__left-icon,
.van-cell__right-icon {
	line-height: $cell-line-height;
}

.van-cell--clickable.van-cell--hover {
	background-color: $cell-active-color;
}

.van-cell--required {
	overflow: visible;
}

.van-cell--required:before {
	position: absolute;
	content: '*';
	left: $padding-xs;
	font-size: $cell-font-size;
	color: $cell-required-color;
}

.van-cell--center {
	align-items: center;
}

.van-cell--large {
	padding-top: $cell-large-vertical-padding;
	padding-bottom: $cell-large-vertical-padding;
}

.van-cell--large .van-cell__title {
	font-size: $cell-large-title-font-size;
}

.van-cell--large .van-cell__value {
	font-size: $cell-large-value-font-size;
}

.van-cell--large .van-cell__label {
	font-size: $cell-large-label-font-size;
}
</style>
